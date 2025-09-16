// API endpoint for Chinese site form submission
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
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'phone']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
      return res.status(400).json({ 
        error: 'Invalid phone number format' 
      });
    }

    // Insert lead into database
    const query = `
      INSERT INTO chinese_site_leads (name, email, phone, source, status)
      VALUES ($1, $2, $3, 'chinese_site', 'new')
      ON CONFLICT (email) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, created_at
    `;

    const values = [name, email, phone];
    const result = await pool.query(query, values);

    // Log successful submission
    console.log('Chinese site lead submitted:', {
      id: result.rows[0].id,
      name,
      email,
      phone,
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
        phone,
        source: 'chinese_site',
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
