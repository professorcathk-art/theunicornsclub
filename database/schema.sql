-- Neon Database Schema for The Unicorns Club Lead Collection
-- This creates tables for both main site and Chinese site form submissions

-- Main site leads table (English form)
CREATE TABLE IF NOT EXISTS main_site_leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(100) NOT NULL,
    company VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50) DEFAULT 'main_site',
    status VARCHAR(50) DEFAULT 'new'
);

-- Chinese site leads table (Chinese form)
CREATE TABLE IF NOT EXISTS chinese_site_leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50) DEFAULT 'chinese_site',
    status VARCHAR(50) DEFAULT 'new'
);

-- Combined leads view for analytics
CREATE OR REPLACE VIEW all_leads AS
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
FROM (
    SELECT 
        id,
        name,
        email,
        NULL as phone,
        role,
        company,
        source,
        status,
        created_at,
        updated_at
    FROM main_site_leads
    UNION ALL
    SELECT 
        id,
        name,
        email,
        phone,
        NULL as role,
        NULL as company,
        source,
        status,
        created_at,
        updated_at
    FROM chinese_site_leads
) combined_leads
ORDER BY created_at DESC;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_main_leads_email ON main_site_leads(email);
CREATE INDEX IF NOT EXISTS idx_main_leads_created_at ON main_site_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_chinese_leads_email ON chinese_site_leads(email);
CREATE INDEX IF NOT EXISTS idx_chinese_leads_created_at ON chinese_site_leads(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_main_leads_updated_at 
    BEFORE UPDATE ON main_site_leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chinese_leads_updated_at 
    BEFORE UPDATE ON chinese_site_leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
