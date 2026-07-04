import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Standard relational connection pool targeting local PostgreSQL database
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/worksphere'
});

pool.on('connect', () => {
  console.log('⚡ Connected securely to the local PostgreSQL database.');
});

export default pool;