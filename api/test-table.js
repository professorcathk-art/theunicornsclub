// Test database table structure
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
    // Check if table exists and get its structure
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'chinese_site_leads'
      ORDER BY ordinal_position
    `);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Table chinese_site_leads does not exist'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Table structure found',
      columns: result.rows,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Table test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check table structure',
      error: error.message
    });
  }
};
