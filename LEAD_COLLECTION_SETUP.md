# 🎯 Complete Lead Collection Setup Guide

## Overview
This guide will help you set up a complete lead collection system for your Wonderful Future website using Neon database and Vercel API endpoints.

## 🗄️ Part 1: Neon Database Setup

### Step 1.1: Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up with your GitHub account
3. Create a new project called "theunicornsclub"

### Step 1.2: Get Database Connection String
1. In your Neon dashboard, go to "Connection Details"
2. Copy the connection string (looks like: `postgresql://username:password@hostname/database`)
3. Save this for later use

### Step 1.3: Create Database Tables
1. Go to "SQL Editor" in your Neon dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Execute the SQL to create tables and functions

## 🔧 Part 2: Environment Variables

### Step 2.1: Create Environment File
Create a `.env` file in your project root:
```env
# Neon Database Configuration
DATABASE_URL=your_neon_connection_string_here
NEON_DATABASE_URL=your_neon_connection_string_here

# API Configuration
API_SECRET_KEY=your_secret_key_here_make_it_long_and_random
NODE_ENV=production
```

### Step 2.2: Generate API Secret Key
```bash
# Generate a random secret key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Part 3: Deploy to Vercel

### Step 3.1: Install Dependencies
```bash
npm install
```

### Step 3.2: Deploy to Vercel
```bash
npx vercel --prod
```

### Step 3.3: Set Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:
   - `DATABASE_URL` = your Neon connection string
   - `API_SECRET_KEY` = your secret key
   - `NODE_ENV` = production

## 📝 Part 4: Update Frontend Forms

### Step 4.1: Update Main Site Form
The main site form needs to be updated to submit to the API endpoint. Here's the updated JavaScript:

```javascript
// Update the handleMainFormSubmission function in app.js
async function handleMainFormSubmission() {
    const form = document.getElementById('mainContactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const buttonLoading = submitButton.querySelector('.btn-loading');
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const role = formData.get('role');
    const company = formData.get('company');

    // Basic validation
    if (!name || !email || !role) {
        showMainNotification('Please fill in all required fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMainNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    if (buttonText && buttonLoading) {
        buttonText.classList.add('hidden');
        buttonLoading.classList.remove('hidden');
    }
    submitButton.disabled = true;

    try {
        // Submit to API
        const response = await fetch('/api/submit-main-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                role,
                company
            })
        });

        const result = await response.json();

        if (response.ok) {
            showMainNotification('Thank you for joining our network! We\'ll be in touch soon.', 'success');
            form.reset();
            
            // Add celebration effect
            setTimeout(() => {
                showTransitionEffect('🎉');
            }, 500);
        } else {
            showMainNotification(result.message || 'Failed to submit form. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMainNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        if (buttonText && buttonLoading) {
            buttonText.classList.remove('hidden');
            buttonLoading.classList.add('hidden');
        }
        submitButton.disabled = false;
    }
}
```

### Step 4.2: Update Chinese Site Form
Similarly, update the Chinese form submission:

```javascript
// Update the handleChineseFormSubmission function in app.js
async function handleChineseFormSubmission() {
    const form = document.getElementById('registrationForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const buttonLoading = submitButton.querySelector('.btn-loading');
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    // Basic validation
    if (!name || !email || !phone) {
        showChineseNotification('請填寫所有必填欄位', 'error');
        shakeElement(form);
        return;
    }

    if (!isValidEmail(email)) {
        showChineseNotification('請輸入有效的電子郵件地址', 'error');
        shakeElement(form.querySelector('#email'));
        return;
    }

    if (!isValidPhone(phone)) {
        showChineseNotification('請輸入有效的電話號碼', 'error');
        shakeElement(form.querySelector('#phone'));
        return;
    }

    // Show loading state
    if (buttonText && buttonLoading) {
        buttonText.classList.add('hidden');
        buttonLoading.classList.remove('hidden');
    }
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    try {
        // Submit to API
        const response = await fetch('/api/submit-chinese-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone
            })
        });

        const result = await response.json();

        if (response.ok) {
            showChineseNotification('註冊成功！正在跳轉...', 'success');
            
            // Navigate with celebration
            setTimeout(() => {
                showCelebration();
                navigateToThankYouPage();
            }, 1000);
        } else {
            showChineseNotification(result.message || '註冊失敗，請重試', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showChineseNotification('網絡錯誤，請檢查連接後重試', 'error');
    } finally {
        // Reset button state
        if (buttonText && buttonLoading) {
            buttonText.classList.remove('hidden');
            buttonLoading.classList.add('hidden');
        }
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}
```

## 📊 Part 5: Viewing Leads

### Step 5.1: API Endpoint for Leads
You can retrieve leads using the API endpoint:
```
GET /api/get-leads?source=main_site&limit=50&offset=0
Authorization: Bearer your_api_secret_key
```

### Step 5.2: Example API Usage
```javascript
// Get all leads
const response = await fetch('/api/get-leads', {
    headers: {
        'Authorization': 'Bearer your_api_secret_key'
    }
});
const leads = await response.json();

// Get only main site leads
const mainLeads = await fetch('/api/get-leads?source=main_site', {
    headers: {
        'Authorization': 'Bearer your_api_secret_key'
    }
});

// Get only Chinese site leads
const chineseLeads = await fetch('/api/get-leads?source=chinese_site', {
    headers: {
        'Authorization': 'Bearer your_api_secret_key'
    }
});
```

## 🧪 Part 6: Testing

### Step 6.1: Test Database Connection
```bash
# Test the database connection
node -e "
const { testConnection } = require('./lib/database.js');
testConnection().then(connected => {
    console.log('Database connected:', connected);
    process.exit(0);
});
"
```

### Step 6.2: Test Form Submissions
1. Deploy your site to Vercel
2. Fill out both forms
3. Check your Neon database to see if leads are being saved
4. Use the API endpoint to retrieve leads

## 🔒 Part 7: Security Considerations

1. **API Key Protection**: Keep your API secret key secure
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **Input Validation**: All inputs are validated on both frontend and backend
4. **CORS**: Properly configured for your domain
5. **SSL**: Database connections use SSL

## 📈 Part 8: Analytics and Monitoring

### Step 8.1: Database Monitoring
- Monitor your Neon database usage
- Set up alerts for high usage
- Regular backups are automatic with Neon

### Step 8.2: Lead Analytics
- Track conversion rates by source
- Monitor form completion rates
- Set up email notifications for new leads

## 🎯 Next Steps

1. ✅ Set up Neon database
2. ✅ Create API endpoints
3. ✅ Deploy to Vercel
4. ✅ Update frontend forms
5. ✅ Test the complete flow
6. 🔄 Set up email notifications (optional)
7. 🔄 Create admin dashboard (optional)
8. 🔄 Add lead management features (optional)

## 🆘 Troubleshooting

### Common Issues:
1. **Database Connection Failed**: Check your DATABASE_URL
2. **CORS Errors**: Ensure API endpoints have proper CORS headers
3. **Form Not Submitting**: Check browser console for errors
4. **API Key Issues**: Verify your API_SECRET_KEY is set correctly

### Support:
- Neon Documentation: [neon.tech/docs](https://neon.tech/docs)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- PostgreSQL Documentation: [postgresql.org/docs](https://postgresql.org/docs)
