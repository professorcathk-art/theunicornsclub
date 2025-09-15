# 🗄️ Neon Database Setup Guide

## Step 1: Create Neon Database

### 1.1 Sign up for Neon
1. Go to [neon.tech](https://neon.tech)
2. Sign up with your GitHub account
3. Create a new project called "theunicornsclub"

### 1.2 Get Database Connection Details
After creating your project, you'll get:
- **Connection String** (looks like: `postgresql://username:password@hostname/database`)
- **Database URL** for your application

### 1.3 Run the Database Schema
1. Go to your Neon dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `database/schema.sql`
4. Execute the SQL to create tables and functions

## Step 2: Environment Variables

Create a `.env` file in your project root:
```env
# Neon Database Configuration
DATABASE_URL=your_neon_connection_string_here
NEON_DATABASE_URL=your_neon_connection_string_here

# API Configuration
API_SECRET_KEY=your_secret_key_here
NODE_ENV=production
```

## Step 3: Database Tables Created

### Main Site Leads Table
- `id` - Primary key
- `name` - User's name
- `email` - User's email (unique)
- `role` - User's role/position
- `company` - User's company
- `created_at` - Timestamp when lead was created
- `updated_at` - Timestamp when lead was last updated
- `source` - Always 'main_site'
- `status` - Lead status (new, contacted, converted, etc.)

### Chinese Site Leads Table
- `id` - Primary key
- `name` - User's name
- `email` - User's email (unique)
- `phone` - User's phone number
- `created_at` - Timestamp when lead was created
- `updated_at` - Timestamp when lead was last updated
- `source` - Always 'chinese_site'
- `status` - Lead status (new, contacted, converted, etc.)

## Step 4: Testing Your Database

You can test your database connection using the SQL Editor in Neon:
```sql
-- Test main site leads table
INSERT INTO main_site_leads (name, email, role, company) 
VALUES ('Test User', 'test@example.com', 'Developer', 'Test Company');

-- Test Chinese site leads table
INSERT INTO chinese_site_leads (name, email, phone) 
VALUES ('测试用户', 'test@chinese.com', '+1234567890');

-- View all leads
SELECT * FROM all_leads;
```

## Step 5: Next Steps

After setting up the database:
1. ✅ Database tables created
2. 🔄 Backend API endpoints (next step)
3. 🔄 Frontend form integration (next step)
4. 🔄 Testing and deployment (next step)

## 📊 Database Features

- **Automatic timestamps** for created_at and updated_at
- **Unique email constraints** to prevent duplicates
- **Combined view** for analytics across both forms
- **Indexes** for optimal query performance
- **Triggers** for automatic timestamp updates
