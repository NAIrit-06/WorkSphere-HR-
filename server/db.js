import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file if it doesn't exist
const initJsonDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    const defaultDb = {
      users: [
        {
          id: 1,
          employee_id: 'WS-ADMIN',
          name: 'HR Administrator',
          email: 'admin@worksphere.com',
          password_hash: '$2a$10$X7m867vC7S1N6m9E6LAn6u9Lg79RHeXhR7rXfJp4W/LhO2M.HhRyC', // bcrypt hash for 'admin'
          role: 'Admin',
          phone: '+91 98765 43210',
          address: 'Salt Lake Sector V, Kolkata',
          profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          job_title: 'HR Director',
          department: 'Human Resources',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          employee_id: 'WS-1001',
          name: 'Nairit Mandal',
          email: 'nairit@worksphere.com',
          password_hash: '$2a$10$X7m867vC7S1N6m9E6LAn6u9Lg79RHeXhR7rXfJp4W/LhO2M.HhRyC', // bcrypt hash for 'admin' (using admin password as standard seed password)
          role: 'Employee',
          phone: '+91 91234 56789',
          address: 'Kolkata, West Bengal',
          profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          job_title: 'Associate AI Engineer',
          department: 'Engineering',
          created_at: new Date().toISOString()
        }
      ],
      attendance: [],
      leaves: [],
      payroll: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  }
};

const readJsonDb = () => {
  initJsonDb();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const writeJsonDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// Mock PostgreSQL Query Interface targeting local JSON database
class MockPool {
  on(event, handler) {
    if (event === 'connect') {
      setTimeout(handler, 100);
    }
  }

  async query(sql, params = []) {
    const db = readJsonDb();
    const cleanSql = sql.replace(/\s+/g, ' ').trim();

    // 1. SELECT id FROM users WHERE email = $1 OR employee_id = $2
    if (cleanSql.includes('SELECT id FROM users WHERE email = $1 OR employee_id = $2')) {
      const rows = db.users.filter(u => u.email === params[0] || u.employee_id === params[1]);
      return { rows };
    }

    // 2. INSERT INTO users (employee_id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)
    if (cleanSql.includes('INSERT INTO users (employee_id, name, email, password_hash, role)') && !cleanSql.includes('job_title')) {
      const newUser = {
        id: db.users.length + 1,
        employee_id: params[0],
        name: params[1],
        email: params[2],
        password_hash: params[3],
        role: params[4],
        phone: '',
        address: '',
        profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        job_title: 'Junior Developer',
        department: 'Engineering',
        created_at: new Date().toISOString()
      };
      db.users.push(newUser);
      writeJsonDb(db);
      return { rows: [newUser] };
    }

    // 3. SELECT * FROM users WHERE email = $1
    if (cleanSql.includes('SELECT * FROM users WHERE email = $1')) {
      const rows = db.users.filter(u => u.email === params[0]);
      return { rows };
    }

    // 4. SELECT id, employee_id, name, email, role, phone, address, profile_picture, job_title, department FROM users WHERE id = $1
    if (cleanSql.includes('SELECT id, employee_id, name, email, role, phone, address, profile_picture, job_title, department FROM users WHERE id = $1')) {
      const rows = db.users.filter(u => u.id === params[0]);
      return { rows };
    }

    // 5. UPDATE users SET phone = $1, address = $2, profile_picture = COALESCE($3, profile_picture) WHERE id = $4
    if (cleanSql.includes('UPDATE users SET phone = $1, address = $2, profile_picture = COALESCE($3, profile_picture) WHERE id = $4')) {
      const index = db.users.findIndex(u => u.id === params[3]);
      if (index !== -1) {
        db.users[index].phone = params[0] || db.users[index].phone;
        db.users[index].address = params[1] || db.users[index].address;
        db.users[index].profile_picture = params[2] || db.users[index].profile_picture;
        writeJsonDb(db);
        return { rows: [db.users[index]] };
      }
      return { rows: [] };
    }

    // 6. INSERT INTO attendance (user_id, date, check_in, status)
    if (cleanSql.includes('INSERT INTO attendance (user_id, date, check_in, status)')) {
      const userId = params[0];
      const today = new Date().toISOString().split('T')[0];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      const existingIndex = db.attendance.findIndex(a => a.user_id === userId && a.date === today);
      let record;
      if (existingIndex !== -1) {
        db.attendance[existingIndex].check_in = time;
        record = db.attendance[existingIndex];
      } else {
        record = {
          id: db.attendance.length + 1,
          user_id: userId,
          date: today,
          check_in: time,
          check_out: null,
          status: 'Present'
        };
        db.attendance.push(record);
      }
      writeJsonDb(db);
      return { rows: [record] };
    }

    // 7. UPDATE attendance SET check_out = CURRENT_TIME
    if (cleanSql.includes('UPDATE attendance SET check_out = CURRENT_TIME')) {
      const userId = params[0];
      const today = new Date().toISOString().split('T')[0];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });

      const index = db.attendance.findIndex(a => a.user_id === userId && a.date === today);
      if (index !== -1) {
        db.attendance[index].check_out = time;
        writeJsonDb(db);
        return { rows: [db.attendance[index]] };
      }
      return { rows: [] };
    }

    // 8. SELECT * FROM attendance WHERE user_id = $1
    if (cleanSql.includes('SELECT * FROM attendance WHERE user_id = $1')) {
      const rows = db.attendance.filter(a => a.user_id === params[0]).sort((a, b) => b.date.localeCompare(a.date));
      return { rows };
    }

    // 9. INSERT INTO leaves (user_id, leave_type, start_date, end_date, remarks)
    if (cleanSql.includes('INSERT INTO leaves (user_id, leave_type, start_date, end_date, remarks)')) {
      const newLeave = {
        id: db.leaves.length + 1,
        user_id: params[0],
        leave_type: params[1],
        start_date: params[2],
        end_date: params[3],
        remarks: params[4],
        status: 'Pending',
        admin_comments: '',
        created_at: new Date().toISOString()
      };
      db.leaves.push(newLeave);
      writeJsonDb(db);
      return { rows: [newLeave] };
    }

    // 10. SELECT * FROM leaves WHERE user_id = $1
    if (cleanSql.includes('SELECT * FROM leaves WHERE user_id = $1')) {
      const rows = db.leaves.filter(l => l.user_id === params[0]).sort((a, b) => b.created_at.localeCompare(a.created_at));
      return { rows };
    }

    // 11. SELECT * FROM payroll WHERE user_id = $1
    if (cleanSql.includes('SELECT * FROM payroll WHERE user_id = $1')) {
      const rows = db.payroll.filter(p => p.user_id === params[0]).sort((a, b) => b.month_year.localeCompare(a.month_year));
      return { rows };
    }

    // 12. SELECT id, employee_id, name, email, role, job_title, department FROM users ORDER BY id ASC
    if (cleanSql.includes('SELECT id, employee_id, name, email, role, job_title, department FROM users ORDER BY id ASC')) {
      const rows = db.users.map(u => ({
        id: u.id,
        employee_id: u.employee_id,
        name: u.name,
        email: u.email,
        role: u.role,
        job_title: u.job_title,
        department: u.department
      })).sort((a, b) => a.id - b.id);
      return { rows };
    }

    // 13. INSERT INTO users (employee_id, name, email, password_hash, role, job_title, department) VALUES ($1, $2, $3, $4, $5, $6, $7)
    if (cleanSql.includes('INSERT INTO users (employee_id, name, email, password_hash, role, job_title, department)')) {
      const newUser = {
        id: db.users.length + 1,
        employee_id: params[0],
        name: params[1],
        email: params[2],
        password_hash: params[3],
        role: params[4],
        phone: '',
        address: '',
        profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        job_title: params[5],
        department: params[6],
        created_at: new Date().toISOString()
      };
      db.users.push(newUser);
      writeJsonDb(db);
      return { rows: [newUser] };
    }

    // 14. SELECT a.*, u.name, u.employee_id FROM attendance a JOIN users u ON a.user_id = u.id ORDER BY a.date DESC
    if (cleanSql.includes('SELECT a.*, u.name, u.employee_id FROM attendance a JOIN users u')) {
      const rows = db.attendance.map(a => {
        const user = db.users.find(u => u.id === a.user_id);
        return {
          ...a,
          name: user ? user.name : 'Unknown',
          employee_id: user ? user.employee_id : 'N/A'
        };
      }).sort((a, b) => b.date.localeCompare(a.date));
      return { rows };
    }

    // 15. SELECT l.*, u.name, u.employee_id FROM leaves l JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC
    if (cleanSql.includes('SELECT l.*, u.name, u.employee_id FROM leaves l JOIN users u')) {
      const rows = db.leaves.map(l => {
        const user = db.users.find(u => u.id === l.user_id);
        return {
          ...l,
          name: user ? user.name : 'Unknown',
          employee_id: user ? user.employee_id : 'N/A'
        };
      }).sort((a, b) => b.created_at.localeCompare(a.created_at));
      return { rows };
    }

    // 16. UPDATE leaves SET status = $1, admin_comments = $2 WHERE id = $3
    if (cleanSql.includes('UPDATE leaves SET status = $1, admin_comments = $2 WHERE id = $3')) {
      const index = db.leaves.findIndex(l => l.id === params[2]);
      if (index !== -1) {
        db.leaves[index].status = params[0];
        db.leaves[index].admin_comments = params[1];
        writeJsonDb(db);
        return { rows: [db.leaves[index]] };
      }
      return { rows: [] };
    }

    // 17. SELECT p.*, u.name, u.employee_id FROM payroll p JOIN users u
    if (cleanSql.includes('SELECT p.*, u.name, u.employee_id FROM payroll p JOIN users u')) {
      const rows = db.payroll.map(p => {
        const user = db.users.find(u => u.id === p.user_id);
        return {
          ...p,
          name: user ? user.name : 'Unknown',
          employee_id: user ? user.employee_id : 'N/A'
        };
      }).sort((a, b) => b.month_year.localeCompare(a.month_year));
      return { rows };
    }

    // 18. INSERT INTO payroll (user_id, month_year, base_salary, allowances, deductions, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT ...
    if (cleanSql.includes('INSERT INTO payroll (user_id, month_year, base_salary, allowances, deductions, status)')) {
      const userId = parseInt(params[0]);
      const monthYear = params[1];
      const baseSalary = parseFloat(params[2] || 0);
      const allowances = parseFloat(params[3] || 0);
      const deductions = parseFloat(params[4] || 0);
      const netSalary = baseSalary + allowances - deductions;
      const status = params[5];

      const existingIndex = db.payroll.findIndex(p => p.user_id === userId && p.month_year === monthYear);
      let record;
      if (existingIndex !== -1) {
        db.payroll[existingIndex].base_salary = baseSalary;
        db.payroll[existingIndex].allowances = allowances;
        db.payroll[existingIndex].deductions = deductions;
        db.payroll[existingIndex].net_salary = netSalary;
        db.payroll[existingIndex].status = status;
        record = db.payroll[existingIndex];
      } else {
        record = {
          id: db.payroll.length + 1,
          user_id: userId,
          month_year: monthYear,
          base_salary: baseSalary,
          allowances: allowances,
          deductions: deductions,
          net_salary: netSalary,
          status: status
        };
        db.payroll.push(record);
      }
      writeJsonDb(db);
      return { rows: [record] };
    }

    console.warn('⚠️ Unknown Mock Database Query:', cleanSql);
    return { rows: [] };
  }
}

let pool;

try {
  // Test connection to Postgres (set connection timeout to fail quickly if Postgres is not running)
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/worksphere',
    connectionTimeoutMillis: 1500
  });

  // Attempt to run a basic test query
  await pool.query('SELECT 1');
  console.log('⚡ Connected securely to the local PostgreSQL database.');
} catch (err) {
  console.log('⚠️ PostgreSQL database connection failed or is not configured.');
  console.log('🔄 Falling back to a portable, file-based JSON database (database.json).');
  initJsonDb();
  pool = new MockPool();
}

export default pool;