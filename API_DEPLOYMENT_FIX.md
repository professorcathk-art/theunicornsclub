# 🔧 API Deployment Fix for Vercel

## Issue
The API endpoints are returning 404 errors because Vercel wasn't properly configured to handle the API routes.

## Solution Applied

### 1. Updated vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### 2. Added Test API Endpoint
Created `/api/test.js` to verify API functionality.

### 3. Updated Node.js Version
Set minimum Node.js version to 18.0.0 for better compatibility.

## Deployment Steps

### Option 1: Redeploy via Vercel Dashboard
1. Go to your Vercel dashboard
2. Find your project
3. Click "Redeploy" on the latest deployment
4. Or trigger a new deployment by pushing to GitHub

### Option 2: Force Redeploy via CLI
```bash
# Commit the changes
git add .
git commit -m "Fix Vercel API deployment configuration"
git push origin main

# This will trigger automatic deployment
```

### Option 3: Manual Redeploy
```bash
npx vercel --prod --force
```

## Testing the Fix

### 1. Test API Endpoint
Visit: `https://your-domain.vercel.app/api/test`
Should return: `{"success": true, "message": "API is working!"}`

### 2. Test Form Submissions
- Fill out the main site form
- Fill out the Chinese site form
- Check your Neon database for new leads

### 3. Check API Endpoints
- `/api/submit-main-form` - Main site form submission
- `/api/submit-chinese-form` - Chinese site form submission
- `/api/get-leads` - Retrieve leads (requires API key)

## Environment Variables in Vercel

Make sure these are set in your Vercel dashboard:
- `DATABASE_URL` = your Neon connection string
- `API_SECRET_KEY` = your secret key
- `NODE_ENV` = production

## Troubleshooting

### If APIs still return 404:
1. Check Vercel function logs in dashboard
2. Verify environment variables are set
3. Ensure Node.js version is 18+
4. Check that API files are in `/api/` directory

### If Database connection fails:
1. Verify DATABASE_URL is correct
2. Check Neon database is accessible
3. Test connection with test script

## Expected Behavior After Fix

✅ API endpoints return JSON responses
✅ Forms submit successfully
✅ Leads are saved to database
✅ No more 404 errors
✅ No more "The page could not be found" errors
