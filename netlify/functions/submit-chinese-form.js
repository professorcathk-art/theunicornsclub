// Netlify function for Chinese site form submission
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          required: ['name', 'email', 'phone']
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid email format' 
        })
      };
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid phone number format' 
        })
      };
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
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
      })
    };

  } catch (error) {
    console.error('Database error:', error);
    
    // Return appropriate error response
    if (error.code === '23505') { // Unique constraint violation
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          error: 'Email already exists',
          message: 'This email address is already registered'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to submit lead. Please try again.'
      })
    };
  }
};
