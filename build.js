// Build script for The Unicorns Club
const fs = require('fs');
const path = require('path');

console.log('🦄 Building The Unicorns Club for production...');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    console.error('❌ Public directory not found!');
    process.exit(1);
}

// List files to be deployed
const files = fs.readdirSync(publicDir);
console.log('📁 Files ready for deployment:');
files.forEach(file => {
    const filePath = path.join(publicDir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
        const size = (stats.size / 1024).toFixed(2);
        console.log(`  ✅ ${file} (${size} KB)`);
    }
});

// Check for required files
const requiredFiles = ['index.html', 'style.css', 'app.js'];
const missingFiles = requiredFiles.filter(file => !files.includes(file));

if (missingFiles.length > 0) {
    console.error('❌ Missing required files:', missingFiles.join(', '));
    process.exit(1);
}

console.log('✅ Build completed successfully!');
console.log('🚀 Ready for deployment!');
console.log('');
console.log('📖 Deployment options:');
console.log('  • Run: ./deploy.sh');
console.log('  • Or see: DEPLOYMENT.md');
console.log('  • Or drag public/ folder to Netlify');
