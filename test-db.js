// Test script for database connection
const { Pool } = require('pg');
require('dotenv').config();

async function testDatabaseConnection() {
    console.log('🔄 Testing database connection...');
    
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        // Test basic connection
        const client = await pool.connect();
        console.log('✅ Database connection successful!');
        
        // Test query
        const result = await client.query('SELECT NOW() as current_time');
        console.log('✅ Query test successful:', result.rows[0]);
        
        // Test table existence
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('main_site_leads', 'chinese_site_leads')
        `);
        
        console.log('✅ Tables found:', tablesResult.rows.map(row => row.table_name));
        
        // Test insert (main site)
        const insertResult = await client.query(`
            INSERT INTO main_site_leads (name, email, role, company) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, created_at
        `, ['Test User', 'test@example.com', 'Developer', 'Test Company']);
        
        console.log('✅ Main site lead insert test:', insertResult.rows[0]);
        
        // Test insert (Chinese site)
        const chineseInsertResult = await client.query(`
            INSERT INTO chinese_site_leads (name, email, phone) 
            VALUES ($1, $2, $3) 
            RETURNING id, created_at
        `, ['测试用户', 'test@chinese.com', '+1234567890']);
        
        console.log('✅ Chinese site lead insert test:', chineseInsertResult.rows[0]);
        
        // Test combined view
        const viewResult = await client.query('SELECT COUNT(*) as total_leads FROM all_leads');
        console.log('✅ Combined view test:', viewResult.rows[0]);
        
        client.release();
        console.log('🎉 All database tests passed!');
        
    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        console.error('Full error:', error);
    } finally {
        await pool.end();
    }
}

// Run the test
testDatabaseConnection();
