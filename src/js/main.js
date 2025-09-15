// The Unicorns Club - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🦄 Welcome to The Unicorns Club!');
    
    // Add some magical sparkle to the page
    addSparkleEffect();
    
    // Welcome message
    setTimeout(() => {
        console.log('✨ Your magical website is ready!');
    }, 1000);
});

function addSparkleEffect() {
    // Create sparkle elements
    for (let i = 0; i < 20; i++) {
        createSparkle();
    }
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
    sparkle.style.opacity = Math.random() * 0.5 + 0.3;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = `sparkle ${Math.random() * 3 + 2}s infinite`;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 5000);
}

// Add CSS animation for sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
