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
 
        // Check if AOS is loaded
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 300,
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
                    card.style.animationDelay = `${index * 0.05}s`;
                }, 150);
            });
        }
    
        // Touch device detection and support
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
    
            const infoIcons = document.querySelectorAll('.hover-icon');
            infoIcons.forEach(icon => {
                icon.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const serviceInfo = this.closest('.service-info');
                    
                    // Close other open tooltips
                    document.querySelectorAll('.service-info.active').forEach(info => {
                        if (info !== serviceInfo) {
                            info.classList.remove('active');
                        }
                    });
    
                    // Toggle current tooltip
                    serviceInfo.classList.toggle('active');
                });
            });
    
            // Close tooltips when clicking outside
            document.addEventListener('click', function() {
                document.querySelectorAll('.service-info.active').forEach(info => {
                    info.classList.remove('active');
                });
            });
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

document.addEventListener('DOMContentLoaded', function() {
    
    // Add animation to logos on page load
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach((logo, index) => {
        setTimeout(() => {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(20px)';
            
            // Trigger reflow
            void logo.offsetWidth;
            
            // Add transition
            logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Show with animation
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    
});

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Form Submission
    const ctaForm = document.getElementById('cta-contact-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(ctaForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to your server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            ctaForm.innerHTML = `
                <div class="success-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#00A651" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3>Thank you!</h3>
                    <p>Your request has been submitted successfully. We'll be in touch with you shortly.</p>
                </div>
            `;
            
            // Add success style
            document.querySelector('.success-message').style.textAlign = 'center';
            document.querySelector('.success-message h3').style.color = '#00A651';
            document.querySelector('.success-message h3').style.margin = '15px 0';
            document.querySelector('.success-message p').style.color = '#333';
        });
    }
});   

 

//zoho
document.addEventListener('DOMContentLoaded', () => {
    const zohoFeatures = document.querySelectorAll('.zoho-feature');

    zohoFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'scale(1.05)';
            feature.style.transition = 'transform 0.3s ease';
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'scale(1)';
        });
    });

    // Optional: Add scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    zohoFeatures.forEach(feature => {
        observer.observe(feature);
    });
});
// get started cta
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the modal and buttons
    const quoteModal = document.getElementById('quote-modal');
    const ctaButtons = document.querySelectorAll('.btn-primary, #quote-btn');
    const closeButtons = document.querySelectorAll('.close-btn, .close-modal-btn');

    // Function to open the modal
    function openModal() {
        quoteModal.style.display = 'block';
        // Reset form to first step
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('contact-step').style.display = 'none';
        document.getElementById('success-step').style.display = 'none';
    }

    // Function to close the modal
    function closeModal() {
        quoteModal.style.display = 'none';
    }

    // Add click event to all CTA buttons to open modal
    ctaButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    // Add click events to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === quoteModal) {
            closeModal();
        }
    });

    // Navigation between form steps
    const nextButtons = document.querySelectorAll('.next-btn');
    const backButtons = document.querySelectorAll('.back-btn');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.getElementById(nextStepId);

            currentStep.style.display = 'none';
            nextStep.style.display = 'block';
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const prevStepId = this.getAttribute('data-prev');
            const prevStep = document.getElementById(prevStepId);

            currentStep.style.display = 'none';
            prevStep.style.display = 'block';
        });
    });

    // Form submission handling
    const submitRequirementsBtn = document.getElementById('submit-requirements');
    const finalSubmitBtn = document.getElementById('final-submit');

    submitRequirementsBtn.addEventListener('click', function() {
        document.getElementById('step3').style.display = 'none';
        document.getElementById('contact-step').style.display = 'block';
    });

    finalSubmitBtn.addEventListener('click', function() {
        document.getElementById('contact-step').style.display = 'none';
        document.getElementById('success-step').style.display = 'block';
    });
});