// Database connection utility
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Execute a query with error handling
export async function executeQuery(query, values = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Close the pool (useful for testing)
export async function closePool() {
  await pool.end();
}

export default pool;
