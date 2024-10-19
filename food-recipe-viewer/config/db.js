const { Pool } = require('pg');
const dotenv = require('dotenv');

// Initialize dotenv
dotenv.config();

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch((err) => console.error('Database connection error', err));

module.exports = pool;