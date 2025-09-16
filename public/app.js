// Combined JavaScript for Wonderful Future main site and enhanced Chinese sub-site

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize site navigation
    initializeSiteNavigation();
    
    // Initialize main site functionality
    initializeMainSite();
    
    // Initialize Chinese site functionality
    initializeChineseSite();
    
    // Initialize shared animations and utilities
    initializeSharedAnimations();
    
    console.log('Wonderful Future application initialized');
}

// SITE NAVIGATION FUNCTIONS
function initializeSiteNavigation() {
    const chineseSiteBtn = document.getElementById('chineseSiteBtn');
    const footerChineseSiteBtn = document.getElementById('footerChineseSiteBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    
    // Switch to Chinese site
    if (chineseSiteBtn) {
        chineseSiteBtn.addEventListener('click', function() {
            switchToChineseSite();
        });
    }
    
    if (footerChineseSiteBtn) {
        footerChineseSiteBtn.addEventListener('click', function() {
            switchToChineseSite();
        });
    }
    
    // Switch back to main site
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', function() {
            switchToMainSite();
        });
    }
}

function switchToChineseSite() {
    const mainSite = document.getElementById('mainSite');
    const chineseSite = document.getElementById('chineseSite');
    
    if (mainSite && chineseSite) {
        // Add transition effect
        mainSite.style.transition = 'all 0.5s ease';
        mainSite.style.opacity = '0';
        mainSite.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            mainSite.classList.add('hidden');
            chineseSite.classList.remove('hidden');
            chineseSite.style.opacity = '0';
            chineseSite.style.transform = 'translateX(100%)';
            chineseSite.style.transition = 'all 0.5s ease';
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            setTimeout(() => {
                chineseSite.style.opacity = '1';
                chineseSite.style.transform = 'translateX(0)';
                
                // Reinitialize Chinese site animations
                initializeChineseSiteAnimations();
                
                // Show celebration effect
                setTimeout(() => {
                    showTransitionEffect('🦄');
                }, 300);
            }, 50);
        }, 500);
    }
}

function switchToMainSite() {
    const mainSite = document.getElementById('mainSite');
    const chineseSite = document.getElementById('chineseSite');
    
    if (mainSite && chineseSite) {
        // Add transition effect
        chineseSite.style.transition = 'all 0.5s ease';
        chineseSite.style.opacity = '0';
        chineseSite.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            chineseSite.classList.add('hidden');
            mainSite.classList.remove('hidden');
            mainSite.style.opacity = '0';
            mainSite.style.transform = 'translateX(-100%)';
            mainSite.style.transition = 'all 0.5s ease';
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            setTimeout(() => {
                mainSite.style.opacity = '1';
                mainSite.style.transform = 'translateX(0)';
                
                // Reinitialize main site animations
                initializeMainSiteAnimations();
                
                // Show transition effect
                setTimeout(() => {
                    showTransitionEffect('🚀');
                }, 300);
            }, 50);
        }, 500);
    }
}

function showTransitionEffect(emoji) {
    const effect = document.createElement('div');
    effect.innerHTML = emoji;
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        z-index: 10000;
        pointer-events: none;
        animation: transitionPop 1s ease-out forwards;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1000);
}

// MAIN SITE FUNCTIONS
function initializeMainSite() {
    initializeMainNavigation();
    initializeMainContactForm();
    initializeEcosystemInteractions();
    initializeStatsCounters();
    initializeMainSiteAnimations();
}

function initializeMainNavigation() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Learn more button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const ecosystemSection = document.getElementById('ecosystem');
            if (ecosystemSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = ecosystemSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

function initializeMainContactForm() {
    const form = document.getElementById('mainContactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleMainFormSubmission();
    });
    
    // Enhanced form validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateMainFormField(this);
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

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

function validateMainFormField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    // Remove existing error messages
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error', 'success');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!value && field.hasAttribute('required')) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        
        field.parentNode.appendChild(errorDiv);
    } else if (value) {
        field.classList.add('success');
    }
    
    return isValid;
}

function initializeEcosystemInteractions() {
    const ecosystemNodes = document.querySelectorAll('.ecosystem-node');
    const centerNode = document.querySelector('.center-node');
    const connectionLines = document.querySelectorAll('.connection-line');
    
    ecosystemNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            // Highlight connections
            connectionLines[index].style.opacity = '1';
            connectionLines[index].style.strokeWidth = '3';
            
            // Center node response
            if (centerNode) {
                centerNode.style.transform = 'scale(1.1)';
                centerNode.style.boxShadow = '0 0 50px var(--cyber-primary)';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            // Reset connections
            connectionLines[index].style.opacity = '0.6';
            connectionLines[index].style.strokeWidth = '2';
            
            // Reset center node
            if (centerNode) {
                centerNode.style.transform = 'scale(1)';
                centerNode.style.boxShadow = '0 0 30px var(--cyber-primary)';
            }
        });
    });
}

function initializeStatsCounters() {
    const statNumbers = document.querySelectorAll('.cyber-stat .stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current).toLocaleString();
            setTimeout(updateCounter, stepTime);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

function initializeMainSiteAnimations() {
    // Cyber grid animation
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        setInterval(() => {
            cyberGrid.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        }, 100);
    }
    
    // Floating particles
    createFloatingParticles();
    
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.cyber-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--cyber-secondary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px currentColor;
        `;
        
        particleContainer.appendChild(particle);
    }
}

function showMainNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.main-notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `main-notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${getNotificationIcon(type)}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;

    // Set background color based on type
    const colors = {
        success: 'var(--cyber-secondary)',
        error: 'var(--cyber-accent)',
        warning: 'var(--cyber-primary)',
        info: 'var(--cyber-primary)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Add close handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            hideNotification(notification);
        }
    }, 5000);
}

// CHINESE SITE FUNCTIONS (Enhanced from attached files)
function initializeChineseSite() {
    initializeChineseRegistrationForm();
    initializeChineseSiteAnimations();
    initializeWhatsAppModal();
    initializeUpsellButtons();
}

function initializeChineseRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    const landingPage = document.getElementById('landingPage');
    const thankYouPage = document.getElementById('thankYouPage');

    // Add main CTA button functionality
    const heroCTA = document.querySelector('.hero-cta .btn');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToRegistration();
        });
    }

    // Add header register button functionality
    const headerCTA = document.querySelector('.header-cta .btn');
    if (headerCTA) {
        headerCTA.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToRegistration();
        });
    }

    // Form submission handler
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleChineseFormSubmission();
        });
    }

    // Initialize form validation
    initializeChineseFormValidation();
}

function scrollToRegistration() {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        
        // Calculate position
        const elementPosition = registrationSection.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementPosition - headerHeight - 20; // Extra padding
        
        // Smooth scroll to position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Focus on first form field after scroll
        setTimeout(() => {
            const firstInput = registrationSection.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 800);
    }
}

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
    const identity = formData.get('identity');
    const businessModel = formData.get('businessModel');
    const businessDeck = formData.get('businessDeck');

    // Basic validation
    if (!name || !email || !phone || !identity) {
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
            body: formData
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

function navigateToThankYouPage() {
    const landingPage = document.getElementById('landingPage');
    const thankYouPage = document.getElementById('thankYouPage');
    
    if (landingPage && thankYouPage) {
        // Add fade out effect
        landingPage.style.transition = 'all 0.5s ease';
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'translateY(-20px)';
        
        setTimeout(function() {
            landingPage.classList.add('hidden');
            thankYouPage.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Add fade in effect
            thankYouPage.style.opacity = '0';
            thankYouPage.style.transform = 'translateY(20px)';
            thankYouPage.style.transition = 'all 0.5s ease';
            
            setTimeout(function() {
                thankYouPage.style.opacity = '1';
                thankYouPage.style.transform = 'translateY(0)';
                
                // Initialize counter animations
                setTimeout(() => {
                    initializeChineseCounterAnimations();
                }, 500);
                
                // Re-initialize scroll animations for thank you page
                initializeChineseScrollAnimations();
                
                // Add staggered animations to upsell cards
                setTimeout(() => {
                    const upsellCards = document.querySelectorAll('.upsell-card');
                    upsellCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, index * 200);
                    });
                }, 500);
            }, 50);
        }, 500);
    }
}

function showCelebration() {
    const celebration = document.getElementById('celebration');
    if (celebration) {
        celebration.classList.remove('hidden');
        
        // Create multiple confetti elements
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 80);
        }
        
        // Hide celebration after animation
        setTimeout(() => {
            celebration.classList.add('hidden');
        }, 5000);
    }
}

function createConfetti() {
    const celebration = document.getElementById('celebration');
    if (!celebration) return;
    
    const confetti = document.createElement('div');
    const emojis = ['🎉', '🎊', '✨', '🌟', '🎈', '🎁', '🦄', '💫'];
    confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 30 + 20}px;
        left: ${Math.random() * 100}%;
        animation: confetti ${Math.random() * 2 + 3}s linear forwards;
        pointer-events: none;
        z-index: 10000;
    `;
    
    celebration.appendChild(confetti);
    
    // Remove element after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

function initializeChineseCounterAnimations() {
    const counters = document.querySelectorAll('.counter-animation');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation immediately
        updateCounter();
    });
}

function initializeWhatsAppModal() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappModal = document.getElementById('whatsappModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // WhatsApp button handler
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            showWhatsAppModal();
        });
    }

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideWhatsAppModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            hideWhatsAppModal();
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideWhatsAppModal();
        }
    });
}

function showWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.opacity = '0';
        
        setTimeout(function() {
            modal.style.opacity = '1';
            modal.style.transition = 'opacity 0.3s ease';
        }, 50);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add scale animation to modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.transition = 'transform 0.3s ease';
            }, 100);
        }
    }
}

function hideWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8)';
        }
        
        modal.style.opacity = '0';
        
        setTimeout(function() {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

function initializeUpsellButtons() {
    // Handle upsell button clicks with enhanced animations
    document.addEventListener('click', function(e) {
        if (e.target.matches('.upsell-card button')) {
            const button = e.target;
            const buttonText = button.textContent;
            
            // Add loading animation to button
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            let message = '';
            let url = '';
            
            if (buttonText.includes('立即訂閱')) {
                message = '正在跳轉到Skool月度訂閱頁面...';
                url = 'https://www.skool.com/unicorn-institute';
            } else if (buttonText.includes('年度計劃')) {
                message = '正在跳轉到年度會員計劃...';
                url = 'https://www.skool.com/unicorn-institute';
            } else if (buttonText.includes('預約諮詢')) {
                message = '正在跳轉到職業教練服務預約...';
                url = 'mailto:contact@unicorn-institute.com?subject=職業教練服務諮詢';
            }
            
            if (message) {
                showChineseNotification(message, 'info');
                
                setTimeout(() => {
                    if (url.startsWith('mailto:')) {
                        window.location.href = url;
                    } else {
                        window.open(url, '_blank');
                    }
                }, 1500);
            }
        }
    });
}

function initializeChineseSiteAnimations() {
    initializeChineseScrollAnimations();
    initializeChineseStaggeredAnimations();
    initializeChineseTypingEffect();
    initializeChineseParallaxEffect();
    initializeChineseHoverEffects();
    initializeChineseDynamicAnimations();
    initializeChineseMobileOptimizations();
    
    // Add initial page load animations
    setTimeout(() => {
        addChineseInitialAnimations();
    }, 100);
}

function initializeChineseScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class based on element type
                if (element.classList.contains('benefit-card') ||
                    element.classList.contains('audience-card') ||
                    element.classList.contains('testimonial-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                
                if (element.classList.contains('fade-in-up')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                
                // Enhanced mobile animations
                if (element.classList.contains('enhanced-mobile')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
                
                // Dynamic card animations
                if (element.classList.contains('dynamic-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(`
        .benefit-card, 
        .audience-card, 
        .testimonial-card, 
        .fade-in-up, 
        .slide-in-left, 
        .slide-in-right,
        .scale-in-animation,
        .enhanced-mobile,
        .dynamic-card
    `);
    
    animateElements.forEach(element => {
        // Set initial state only if not already visible
        if (element.style.opacity !== '1') {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        
        observer.observe(element);
    });
}

function initializeChineseStaggeredAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-animation');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        staggerObserver.observe(element);
    });
}

function initializeChineseTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid currentColor';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                // Blink cursor
                setInterval(() => {
                    element.style.borderRightColor = 
                        element.style.borderRightColor === 'transparent' ? 
                        'currentColor' : 'transparent';
                }, 750);
            }
        }, 100);
    });
}

function initializeChineseParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
}

function initializeChineseHoverEffects() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card tilt effect for larger screens
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.benefit-card, .audience-card, .testimonial-card, .upsell-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

function initializeChineseDynamicAnimations() {
    // Enhanced animations for "Who Should Join" section
    const dynamicCards = document.querySelectorAll('.dynamic-card');
    
    dynamicCards.forEach((card, index) => {
        // Add random delay for organic feel
        const randomDelay = Math.random() * 2000;
        
        setTimeout(() => {
            card.classList.add('animate-in');
        }, randomDelay);
        
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touched');
            }, 200);
        });
    });
    
    // Color morphing animation for icons
    const audienceIcons = document.querySelectorAll('.audience-icon');
    audienceIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animationDelay = `${index * 0.3}s`;
        }, 1000);
    });
}

function initializeChineseMobileOptimizations() {
    // Enhanced mobile-specific animations
    if (window.innerWidth <= 768) {
        const mobileCards = document.querySelectorAll('.enhanced-mobile');
        
        // Add touch ripple effect
        mobileCards.forEach(card => {
            card.addEventListener('touchstart', function(e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.touches[0].clientX - rect.left - size / 2;
                const y = e.touches[0].clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        function updateScrollAnimations() {
            // Mobile-optimized scroll animations
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            const dynamicBg = document.querySelector('.dynamic-background');
            if (dynamicBg) {
                const opacity = Math.max(0.05, Math.min(0.15, scrollTop / windowHeight * 0.2));
                dynamicBg.style.opacity = opacity;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }
    
    // Add viewport resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            // Reinitialize mobile optimizations
            initializeChineseMobileOptimizations();
        }
    });
}

function addChineseInitialAnimations() {
    // Add initial fade-in animations to visible elements
    const initialElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .pulse-animation');
    
    initialElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeChineseFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateChineseField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state on input
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
            
            // Add success animation if valid
            if (this.value && this.checkValidity()) {
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
        
        // Enhanced focus effects
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
}

function validateChineseField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    // Remove existing error messages
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error', 'success');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        isValid = false;
        errorMessage = '此欄位為必填';
    } else {
        switch (fieldType) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = '請輸入有效的電子郵件地址';
                }
                break;
            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = '請輸入有效的電話號碼';
                }
                break;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        
        field.parentNode.appendChild(errorDiv);
        shakeElement(field);
    } else {
        field.classList.add('success');
    }
    
    return isValid;
}

function showChineseNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.chinese-notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `chinese-notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${getNotificationIcon(type)}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        font-family: 'Noto Sans TC', sans-serif;
        backdrop-filter: blur(10px);
    `;

    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Add close handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            hideNotification(notification);
        }
    }, 5000);
}

// SHARED UTILITY FUNCTIONS
function initializeSharedAnimations() {
    // Add CSS keyframes for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes transitionPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 18px;
            flex-shrink: 0;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
            flex-shrink: 0;
            margin-left: auto;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .touched {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease !important;
        }
        
        .animate-in {
            animation: mobileFloatIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        @media (max-width: 768px) {
            .dynamic-card:hover {
                animation: mobilePulse 0.6s ease-out;
            }
            
            .enhanced-mobile:active {
                transform: scale(0.98) translateY(2px) !important;
            }
        }
    `;

    document.head.appendChild(animationStyles);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 400);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8;
}

// Smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Initialize on page load
console.log('Wonderful Future - Connecting Innovation & Investment | 獨角獸研究所 - 連接商業機會與卓越人才');