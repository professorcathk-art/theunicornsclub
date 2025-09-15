#!/bin/bash

# The Unicorns Club - Deployment Script
echo "🦄 The Unicorns Club - Deployment Helper"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if public directory exists
if [ ! -d "public" ]; then
    echo "❌ Error: Public directory not found"
    exit 1
fi

echo "✅ Project structure verified"
echo "📁 Files ready for deployment:"
ls -la public/

echo ""
echo "🚀 Deployment Options:"
echo "1. Netlify (Drag & Drop) - Easiest"
echo "2. Vercel CLI"
echo "3. Netlify CLI"
echo "4. Surge.sh"
echo "5. Show deployment URLs"

read -p "Choose an option (1-5): " choice

case $choice in
    1)
        echo "🌐 Netlify Drag & Drop Deployment:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag the 'public' folder to the deploy area"
        echo "3. Your site will be live instantly!"
        echo ""
        echo "📁 Public folder location: $(pwd)/public"
        ;;
    2)
        echo "Installing Vercel CLI..."
        npm install -g vercel
        echo "Deploying to Vercel..."
        vercel --prod
        ;;
    3)
        echo "Installing Netlify CLI..."
        npm install -g netlify-cli
        echo "Deploying to Netlify..."
        netlify deploy --dir=public --prod
        ;;
    4)
        echo "Installing Surge CLI..."
        npm install -g surge
        echo "Deploying to Surge..."
        surge public
        ;;
    5)
        echo "🔗 Quick Deployment URLs:"
        echo "• Netlify: https://netlify.com"
        echo "• Vercel: https://vercel.com"
        echo "• GitHub Pages: https://pages.github.com"
        echo "• Firebase: https://firebase.google.com/products/hosting"
        echo "• Surge: https://surge.sh"
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process initiated!"
echo "📖 For detailed instructions, see DEPLOYMENT.md"
