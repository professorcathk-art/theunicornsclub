-- Migration to add new fields to Chinese site leads table
-- Run this to add the new fields to existing database

-- Add new columns to chinese_site_leads table
ALTER TABLE chinese_site_leads 
ADD COLUMN IF NOT EXISTS identity VARCHAR(100),
ADD COLUMN IF NOT EXISTS business_model TEXT,
ADD COLUMN IF NOT EXISTS business_deck_filename VARCHAR(255),
ADD COLUMN IF NOT EXISTS business_deck_path TEXT;

-- Update the combined leads view to include new fields
CREATE OR REPLACE VIEW all_leads AS
SELECT 
    id,
    name,
    email,
    phone,
    identity,
    business_model,
    business_deck_filename,
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
        NULL as identity,
        NULL as business_model,
        NULL as business_deck_filename,
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
        identity,
        business_model,
        business_deck_filename,
        NULL as role,
        NULL as company,
        source,
        status,
        created_at,
        updated_at
    FROM chinese_site_leads
) combined_leads
ORDER BY created_at DESC;
