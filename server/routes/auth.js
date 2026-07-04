import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'worksphere_secret_signature_key';

// Registration Endpoint with explicit field validation feedback
router.post('/signup', async (req, res) => {
  const { employeeId, name, email, password, role } = req.body;

  if (!employeeId || !name || !email || !password || !role) {
    return res.status(400).json({ success: false, error: 'All registration parameters are mandatory.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Entered email format is invalid.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, error: 'Security rules violation: Password must be at least 6 characters.' });
  }

  try {
    const userExist = await pool.query('SELECT id FROM users WHERE email = $1 OR employee_id = $2', [email, employeeId]);
    if (userExist.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'User Conflict: Unique Email or Employee ID already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (employee_id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, employee_id, name, email, role',
      [employeeId, name, email, passwordHash, role]
    );

    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database transaction failed during registration processing.' });
  }
});

// Secure Login Authentication Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password credentials are required.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Authentication Failed: Incorrect credentials verified.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, error: 'Authentication Failed: Incorrect credentials verified.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({
      success: true,
      token,
      user: { id: user.id, employeeId: user.employee_id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database authentication transaction engine error.' });
  }
});

export default router;