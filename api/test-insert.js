// Test inserting a record into chinese_site_leads table
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
    // Test insert with minimal data
    const query = `
      INSERT INTO chinese_site_leads (name, email, phone, source, status)
      VALUES ($1, $2, $3, 'test', 'new')
      RETURNING id, created_at
    `;

    const values = ['Test User', 'test@example.com', '1234567890'];
    const result = await pool.query(query, values);
    
    res.status(200).json({
      status: 'success',
      message: 'Test insert successful',
      insertedRecord: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test insert error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Test insert failed',
      error: error.message,
      detail: error.detail,
      code: error.code
    });
  }
};
