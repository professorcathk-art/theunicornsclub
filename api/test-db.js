// Test database connection
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as current_time');
    
    res.status(200).json({
      status: 'success',
      message: 'Database connection working',
      currentTime: result.rows[0].current_time,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
};
