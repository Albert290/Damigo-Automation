// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader-wrapper');
        // Hide loader after page is fully loaded
        setTimeout(function() {
            loader.classList.add('loaded');
            // Remove loader from DOM after animation completes
            setTimeout(function() {
                document.body.removeChild(loader);
            }, 500);
        }, 1500); // Increased time to show the loader animation
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    
    menuToggle.addEventListener('click', function() {
        header.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            // Prevent navigation on mobile when clicking the Services link
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Update active state based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Get the href attribute and extract the path
            const linkPath = link.getAttribute('href');
            
            // Set active class if current path matches link path
            if (currentPath.endsWith(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active link on page load
    setActiveNavLink();
    
    // Window resize handling for mobile menu
    window.addEventListener('resize', function() {
        // Close the mobile menu if window is resized above mobile breakpoint
        if (window.innerWidth > 768 && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
        }
        
        // Reset dropdown states on resize
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Hero section animations and interactions
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Add animation delay to feature items
    featureItems.forEach((item, index) => {
        item.style.animationDelay = `${0.2 * (index + 1)}s`;
        item.classList.add('fade-in');
    });
    
    // Parallax effect for hero section
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            // Subtle parallax effect
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
        });
    }
    
    // Add hover animations for feature items
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

      // Check if AOS is loaded
      if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Fallback animation for service cards if AOS isn't available
    if (typeof AOS === 'undefined') {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.animation = 'fadeInUp 0.8s forwards';
                card.style.animationDelay = `${index * 0.1}s`;
            }, 300);
        });
    }

    // Optional: Add click handler for mobile devices
    const infoIcons = document.querySelectorAll('.hover-icon');
    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the parent service-info element
            const serviceInfo = this.closest('.service-info');
            
            // Toggle an active class for mobile devices
            serviceInfo.classList.toggle('active');
            
            // Close other open tooltips
            document.querySelectorAll('.service-info.active').forEach(info => {
                if (info !== serviceInfo) {
                    info.classList.remove('active');
                }
            });
        });
    });

    // Close tooltips when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.service-info')) {
            document.querySelectorAll('.service-info.active').forEach(info => {
                info.classList.remove('active');
            });
        }
    });
});

// Add touch device detection and support
window.addEventListener('load', function() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Additional CSS for touch devices
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .service-details {
                transition: none;
            }
            
            .touch-device .service-info.active .service-details {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});

// Animation for the "How It Works" section
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Show elements that are in viewport
    function showVisibleItems() {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('show');
            }
        });
    }
    
    // Initial check on page load
    showVisibleItems();
    
    // Check on scroll
    window.addEventListener('scroll', showVisibleItems);
    
    // Quote Modal Functionality
    const quoteBtn = document.getElementById('quote-btn');
    const quoteModal = document.getElementById('quote-modal');
    const closeBtn = document.querySelector('.close-btn');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    // Form steps
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const submitRequirementsBtn = document.getElementById('submit-requirements');
    const finalSubmitBtn = document.getElementById('final-submit');
    
    // Show modal
    quoteBtn.addEventListener('click', function() {
        quoteModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        document.getElementById('step1').classList.add('active');
    });
    
    // Close modal functions
    function closeModal() {
        quoteModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        setTimeout(() => {
            formSteps.forEach(step => {
                step.classList.remove('active');
            });
            
            // Clear inputs
            document.querySelectorAll('input, textarea, select').forEach(input => {
                input.value = '';
                input.classList.remove('error');
            });
            
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.classList.remove('show');
            });
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the modal
    quoteModal.addEventListener('click', function(e) {
        if (e.target === quoteModal) {
            closeModal();
        }
    });
    
    // Form navigation
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.getElementById(nextStepId);
            
            // Basic validation
            let isValid = true;
            const inputs = currentStep.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Get or create error message
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                    errorMsg.classList.add('show');
                } else {
                    input.classList.remove('error');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.remove('show');
                    }
                }
            });
            
            if (isValid) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            }
        });
    });
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepId = this.getAttribute('data-prev');
            const prevStep = document.getElementById(prevStepId);
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
        });
    });
    
    // Submit requirements
    submitRequirementsBtn.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const usersSelect = document.getElementById('users');
        
        if (usersSelect.value === '') {
            usersSelect.classList.add('error');
            
            // Get or create error message
            let errorMsg = usersSelect.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please select the number of users';
                usersSelect.parentNode.insertBefore(errorMsg, usersSelect.nextSibling);
            }
            errorMsg.classList.add('show');
            return;
        }
        
        currentStep.classList.remove('active');
        document.getElementById('contact-step').classList.add('active');
    });
    
    // Final submission
    finalSubmitBtn.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        let isValid = true;
        
        // Validate email
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
            
            let errorMsg = emailInput.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = emailInput.value.trim() === '' ? 'Email is required' : 'Please enter a valid email';
                emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
            }
            errorMsg.classList.add('show');
        } else {
            emailInput.classList.remove('error');
            const errorMsg = emailInput.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.classList.remove('show');
            }
        }
        
        // Validate phone
        if (phoneInput.value.trim() === '') {
            isValid = false;
            phoneInput.classList.add('error');
            
            let errorMsg = phoneInput.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Phone number is required';
                phoneInput.parentNode.insertBefore(errorMsg, phoneInput.nextSibling);
            }
            errorMsg.classList.add('show');
        } else {
            phoneInput.classList.remove('error');
            const errorMsg = phoneInput.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.classList.remove('show');
            }
        }
        
        if (isValid) {
            // Here you would normally send the data to your server
            // For now, we'll just show the success message
            currentStep.classList.remove('active');
            document.getElementById('success-step').classList.add('active');
            
            // For demo purposes: collect all the form data
            const formData = {
                businessType: document.getElementById('business-type').value,
                problem: document.getElementById('problem').value,
                users: document.getElementById('users').value,
                email: emailInput.value,
                phone: phoneInput.value
            };
            
            console.log('Form data collected:', formData);
            // In a real implementation, you would send this data to your server
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// CTA Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    const ctaSection = document.querySelector('.cta-section');
    
    // Smooth scroll animation for the button
    ctaButton.addEventListener('click', function() {
        // Replace with your actual form/quote section ID
        const contactSection = document.querySelector('#contact-section') || document.querySelector('footer');
        
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
    
    // Optional: Add scroll animation to reveal the CTA section
    function revealCTA() {
        const ctaPosition = ctaSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (ctaPosition < screenPosition) {
            ctaSection.classList.add('reveal');
        }
    }
    
    // Execute on page load and scroll
    window.addEventListener('scroll', revealCTA);
    revealCTA(); // Check on initial load
});
