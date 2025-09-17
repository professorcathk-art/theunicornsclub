-- Migration script to add role field to chinese_site_leads table
-- This adds the role field to match the main_site_leads table structure

ALTER TABLE chinese_site_leads
ADD COLUMN IF NOT EXISTS role VARCHAR(100);

-- Update the combined view to include role from chinese_site_leads
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
        role,
        NULL as company,
        source,
        status,
        created_at,
        updated_at
    FROM chinese_site_leads
) combined_leads
ORDER BY created_at DESC;
