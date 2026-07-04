-- WorkSphere Relational Database Schema Setup
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Employee', 'HR', 'Admin')),
    phone VARCHAR(20),
    address TEXT,
    profile_picture VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    job_title VARCHAR(100) DEFAULT 'Junior Developer',
    department VARCHAR(100) DEFAULT 'Engineering',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent', 'Half-day', 'Leave')),
    UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS leaves (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    leave_type VARCHAR(20) NOT NULL CHECK (leave_type IN ('Paid', 'Sick', 'Unpaid')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    remarks TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    admin_comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payroll (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    month_year VARCHAR(20) NOT NULL, -- Format: 'YYYY-MM'
    base_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    allowances NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    deductions NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    net_salary NUMERIC(12, 2) GENERATED ALWAYS AS (base_salary + allowances - deductions) STORED,
    status VARCHAR(20) NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Unpaid')),
    UNIQUE(user_id, month_year)
);

-- Seed an Initial Admin and Employee Account for Hackathon Evaluation
INSERT INTO users (employee_id, name, email, password_hash, role, job_title, department, phone, address)
VALUES 
('WS-ADMIN', 'HR Administrator', 'admin@worksphere.com', '$2a$10$X7m867vC7S1N6m9E6LAn6u9Lg79RHeXhR7rXfJp4W/LhO2M.HhRyC', 'Admin', 'HR Director', 'Human Resources', '+91 98765 43210', 'Salt Lake Sector V, Kolkata'),
('WS-1001', 'Nairit Mandal', 'nairit@worksphere.com', '$2a$10$X7m867vC7S1N6m9E6LAn6u9Lg79RHeXhR7rXfJp4W/LhO2M.HhRyC', 'Employee', 'Associate AI Engineer', 'Engineering', '+91 91234 56789', 'Kolkata, West Bengal')
ON CONFLICT DO NOTHING;