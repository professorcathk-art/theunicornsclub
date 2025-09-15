// API endpoint to retrieve leads (admin access)
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Basic authentication check (you can enhance this)
    const authHeader = req.headers.authorization;
    const expectedToken = process.env.API_SECRET_KEY;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Valid API key required'
      });
    }

    // Get query parameters
    const { source, limit = 100, offset = 0 } = req.query;

    let query = `
      SELECT 
        id,
        name,
        email,
        phone,
        role,
        company,
        source,
        status,
        created_at,
        updated_at
      FROM all_leads
    `;

    const values = [];
    let paramCount = 0;

    // Add source filter if provided
    if (source && (source === 'main_site' || source === 'chinese_site')) {
      paramCount++;
      query += ` WHERE source = $${paramCount}`;
      values.push(source);
    }

    // Add ordering and pagination
    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, values);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM all_leads';
    const countValues = [];
    
    if (source && (source === 'main_site' || source === 'chinese_site')) {
      countQuery += ' WHERE source = $1';
      countValues.push(source);
    }

    const countResult = await pool.query(countQuery, countValues);
    const totalCount = parseInt(countResult.rows[0].count);

    // Return leads data
    return res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < totalCount
      },
      summary: {
        total_leads: totalCount,
        main_site_leads: result.rows.filter(lead => lead.source === 'main_site').length,
        chinese_site_leads: result.rows.filter(lead => lead.source === 'chinese_site').length
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve leads'
    });
  }
}
