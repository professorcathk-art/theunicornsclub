# 🚀 Manual Vercel Deployment Guide - The Unicorns Club

## Why Manual Deployment?
Since the CLI deployment had authentication protection issues, we'll deploy manually through the Vercel website with proper configuration.

## 📁 Project Structure for Vercel
```
theunicornsclub/
├── public/                    # Your website files
│   ├── index.html            # Main website
│   ├── style.css             # Styles
│   ├── app.js                # Frontend JavaScript (updated for Vercel)
│   └── ...
├── api/                      # Serverless functions
│   ├── submit-main-form.js
│   ├── submit-chinese-form.js
│   ├── get-leads.js
│   ├── hello.js
│   ├── test.js
│   └── package.json
├── vercel.json               # Vercel configuration
└── ...
```

## 🚀 Manual Deployment Steps

### Step 1: Deploy to Vercel via Website

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository:**
   - Repository: `professorcathk-art/theunicornsclub`
   - Framework Preset: **Other** (or leave blank)
   - Root Directory: **Leave as default** (should be `.`)
   - Build Command: **Leave empty**
   - Output Directory: **Leave empty**
   - Install Command: **Leave empty**

### Step 2: Configure Project Settings

**In the "Configure Project" step:**

1. **Project Name:** `theunicornsclub` (or your preferred name)
2. **Framework Preset:** Other
3. **Root Directory:** `.` (default)
4. **Build Command:** Leave empty
5. **Output Directory:** Leave empty
6. **Install Command:** Leave empty

### Step 3: Set Environment Variables

**Before deploying, add these environment variables:**

1. **Click "Environment Variables"**
2. **Add these variables:**
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_K6MBcwQ2HiaV@ep-wandering-recipe-a1umd6r5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `API_SECRET_KEY` = `9d480e7d2afddfad615ef1dd82183aba00c171c9c85729e4103732a4071ec2ec`
   - `NODE_ENV` = `production`

### Step 4: Deploy

1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Your site will be live at:** `https://your-project-name.vercel.app`

## 🔧 Vercel Configuration

The `vercel.json` file is properly configured:
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
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 📊 API Endpoints

### Main Site Form
- **URL:** `/api/submit-main-form`
- **Method:** POST
- **Data:** `{ name, email, role, company }`
- **Saves to:** `main_site_leads` table

### Chinese Site Form
- **URL:** `/api/submit-chinese-form`
- **Method:** POST
- **Data:** `{ name, email, phone }`
- **Saves to:** `chinese_site_leads` table

### Test Endpoints
- **URL:** `/api/hello` - Simple test endpoint
- **URL:** `/api/test` - Another test endpoint
- **URL:** `/api/get-leads` - Retrieve leads (with API key)

## 🧪 Testing Your Deployment

### Test API Endpoints:
1. **Hello endpoint:** `https://your-project.vercel.app/api/hello`
2. **Test endpoint:** `https://your-project.vercel.app/api/test`
3. **Main form:** `https://your-project.vercel.app/api/submit-main-form`
4. **Chinese form:** `https://your-project.vercel.app/api/submit-chinese-form`

### Test Your Forms:
1. Go to your Vercel site URL
2. Fill out the main site form
3. Fill out the Chinese site form
4. Check your Neon database for new leads

## 🔗 Custom Domain (Optional)

1. **Go to your project dashboard**
2. **Click "Domains"**
3. **Add your custom domain**
4. **Update DNS records as instructed**
5. **Your site will be available on your custom domain**

## 🆘 Troubleshooting

### If API endpoints return 404:
1. **Check that `api/` folder exists in root**
2. **Verify `vercel.json` configuration**
3. **Check Vercel function logs in dashboard**
4. **Ensure environment variables are set**

### If forms don't submit:
1. **Check browser console for errors**
2. **Verify API endpoints are accessible**
3. **Check Vercel function logs**
4. **Test API endpoints directly**

### If database connection fails:
1. **Verify `DATABASE_URL` is correct**
2. **Check Neon database is accessible**
3. **Check Vercel function logs**
4. **Test database connection locally**

### If you get authentication errors:
1. **Check project settings for "Deployment Protection"**
2. **Disable any password protection**
3. **Check if "Vercel Authentication" is enabled**
4. **Disable any security settings that require authentication**

## 🎯 Expected Results

✅ **API endpoints accessible without authentication**
✅ **Forms submit successfully**
✅ **Leads saved to Neon database**
✅ **Custom domain support**
✅ **Automatic HTTPS**
✅ **Serverless functions working**

## 🎉 Benefits of Vercel

- ✅ **Serverless functions** with Node.js
- ✅ **Automatic deployments** from GitHub
- ✅ **Custom domains** included
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Environment variables** management
- ✅ **Function logs** and monitoring

## 📱 Your Lead Collection System

Once deployed to Vercel:
- **Main Site Form** → Vercel Function → Neon Database
- **Chinese Site Form** → Vercel Function → Neon Database
- **Real-time validation** and error handling
- **Duplicate prevention** with unique email constraints
- **Analytics ready** with combined database view

## 🔄 Switching Between Netlify and Vercel

**To use Netlify:** Update `public/app.js` to use `/.netlify/functions/` endpoints
**To use Vercel:** Update `public/app.js` to use `/api/` endpoints

**Both platforms are now configured and ready to deploy!** 🚀✨

## 📝 Quick Checklist

- [ ] Deploy to Vercel via website
- [ ] Set environment variables
- [ ] Test API endpoints
- [ ] Test form submissions
- [ ] Check database for leads
- [ ] Set up custom domain (optional)
- [ ] Monitor function logs

**Your Vercel deployment should work perfectly with the manual setup!** 🎯
