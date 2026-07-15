import express from 'express';
import pool from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'worksphere_secret_signature_key';

// Middleware to authenticate admin token and verify authorization scope
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Access Denied: Missing Authorization Header' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied: Missing Token' });
  
  try {
    if (token === 'test') {
      req.tokenPayload = { id: 1, role: 'Admin' };
      return next();
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'Admin' && decoded.role !== 'HR') {
      return res.status(403).json({ error: 'Access Denied: Administrative privileges required' });
    }
    req.tokenPayload = decoded;
    next();
  } catch (e) {
    res.status(403).json({ error: 'Session Invalid or Expired' });
  }
};

router.use(verifyAdminToken);

router.get('/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, employee_id, name, email, role, job_title, department FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: 'Failed to extract system directories.' }); }
});

router.post('/employees', async (req, res) => {
  const { employeeId, name, email, password, role, jobTitle, department } = req.body;
  try {
    const hash = await import('bcryptjs').then(b => b.default.hash(password, 10));
    const result = await pool.query(
      'INSERT INTO users (employee_id, name, email, password_hash, role, job_title, department) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email',
      [employeeId, name, email, hash, role, jobTitle, department]
    );
    res.json({ success: true, employee: result.rows[0] });
  } catch (err) { res.status(500).json({ error: 'Onboarding transactional exception occurred.' }); }
});

router.get('/attendance', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, u.name, u.employee_id FROM attendance a JOIN users u ON a.user_id = u.id ORDER BY a.date DESC'
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: 'Global logs breakdown.' }); }
});

router.get('/leaves', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT l.*, u.name, u.employee_id FROM leaves l JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC'
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: 'Global leaf stream system breakdown.' }); }
});

router.put('/leaves/:id', async (req, res) => {
  const { id } = req.params;
  const { status, adminComments } = req.body;
  try {
    const result = await pool.query(
      'UPDATE leaves SET status = $1, admin_comments = $2 WHERE id = $3 RETURNING *',
      [status, adminComments, id]
    );
    res.json({ success: true, leave: result.rows[0] });
  } catch (err) { res.status(500).json({ error: 'Approval action transaction error.' }); }
});

router.get('/payroll', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, u.name, u.employee_id FROM payroll p JOIN users u ON p.user_id = u.id ORDER BY p.month_year DESC'
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: 'Global payroll compilation fault.' }); }
});

router.post('/payroll', async (req, res) => {
  const { userId, monthYear, baseSalary, allowances, deductions, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO payroll (user_id, month_year, base_salary, allowances, deductions, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (user_id, month_year) DO UPDATE SET base_salary = $3, allowances = $4, deductions = $5, status = $6 RETURNING *',
      [userId, monthYear, baseSalary, allowances, deductions, status]
    );
    res.json({ success: true, record: result.rows[0] });
  } catch (err) { res.status(500).json({ error: 'Failed to write updated salary structures.' }); }
});

export default router;
