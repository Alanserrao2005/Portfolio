// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize functionality
    initScrollAnimations();
    initPortfolioFilter();
    initContactForm();
    initScrollIndicator();
});

// Removed old navigation functions - now handled in main DOMContentLoaded

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.section-header, .about-text, .skills-section, .portfolio-item, .contact-info, .contact-form');
    
    animateElements.forEach((element, index) => {
        // Add different animation classes based on position
        if (index % 2 === 0) {
            element.classList.add('fade-in');
        } else {
            element.classList.add('slide-in-left');
        }
        observer.observe(element);
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const originalText = element.textContent;
    const target = parseInt(originalText);
    const hasPlus = originalText.includes('+');
    const hasPercent = originalText.includes('%');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayText = Math.floor(current).toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        
        element.textContent = displayText;
    }, 16);
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formInputs = form.querySelectorAll('input, textarea');

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
        });

        // Validate each field
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission
            showFormSuccess();
            form.reset();
        }
    });

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual form fields
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.name + '-error');
    let isValid = true;

    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                showError(errorElement, 'Name must be at least 2 characters long');
                isValid = false;
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                showError(errorElement, 'Please enter a valid email address');
                isValid = false;
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showError(errorElement, 'Subject must be at least 5 characters long');
                isValid = false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showError(errorElement, 'Message must be at least 10 characters long');
                isValid = false;
            }
            break;
    }

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form error
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Show form success message
function showFormSuccess() {
    const successElement = document.getElementById('form-success');
    successElement.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    successElement.style.display = 'block';
    
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroName = document.querySelector('.hero-name');
    const text = heroName.textContent;
    heroName.textContent = '';
    
    let i = 0;
    const typeWriter = function() {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Initialize typing animation after page load
window.addEventListener('load', function() {
    initTypingAnimation();
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Portfolio item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skill items animation on hover
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
