// Netlify function for main site form submission
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
    const { name, email, role, company } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !role) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          required: ['name', 'email', 'role']
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
          role,
          company,
          source: 'main_site',
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
