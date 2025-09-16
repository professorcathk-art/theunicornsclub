// API endpoint for main site form submission
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, role, company } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'role']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Insert lead into database
    const query = `
      INSERT INTO main_site_leads (name, email, role, company, source, status)
      VALUES ($1, $2, $3, $4, 'main_site', 'new')
      ON CONFLICT (email) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        company = EXCLUDED.company,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, created_at
    `;

    const values = [name, email, role, company || null];
    const result = await pool.query(query, values);

    // Log successful submission
    console.log('Main site lead submitted:', {
      id: result.rows[0].id,
      name,
      email,
      role,
      company,
      created_at: result.rows[0].created_at
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
      lead_id: result.rows[0].id,
      data: {
        name,
        email,
        role,
        company,
        source: 'main_site',
        created_at: result.rows[0].created_at
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    
    // Return appropriate error response
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        error: 'Email already exists',
        message: 'This email address is already registered'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit lead. Please try again.'
    });
  }
}
