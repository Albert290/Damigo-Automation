// Testimonials Page JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader functionality
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader-wrapper');
        
        // Add the 'loaded' class to fade out the loader
        if (loader) {
            setTimeout(function() {
                loader.classList.add('loaded');
            }, 500);

            // Remove loader from DOM after animation completes
            setTimeout(function() {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 1000);
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth <= 768) {
        dropdowns.forEach(function(dropdown) {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }

    // Logo Slider - Clone logos for infinite loop effect
    setupLogoSlider();
    
    // Testimonials Slider
    setupTestimonialsSlider();
});

// Function to set up the logo slider
function setupLogoSlider() {
    const logoSlider = document.querySelector('.logo-slider');
    if (!logoSlider) return;
    
    // Clone the logo slides to create an infinite loop effect
    const slides = logoSlider.querySelectorAll('.logo-slide');
    
    // Clone each slide and append to the slider
    slides.forEach(function(slide) {
        const clone = slide.cloneNode(true);
        logoSlider.appendChild(clone);
    });
    
    // Pause animation on hover
    logoSlider.addEventListener('mouseenter', function() {
        logoSlider.style.animationPlayState = 'paused';
    });
    
    logoSlider.addEventListener('mouseleave', function() {
        logoSlider.style.animationPlayState = 'running';
    });
}

// Function to set up the testimonials slider
function setupTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!slides.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    
    // Set first slide as active
    slides[currentSlide].classList.add('active');
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.testimonials-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        });
    }
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left, show next slide
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        } else if (touchEndX > touchStartX) {
            // Swipe right, show previous slide
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.success-story, .certification-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Call animation function after DOM is loaded
if (window.IntersectionObserver) {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
}

// Add resize event listener to handle layout adjustments
window.addEventListener('resize', function() {
    // Re-initialize dropdown behavior on screen resize
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const link = dropdown.querySelector('a');
        
        // Remove existing event listeners (simplified approach)
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add appropriate event listeners based on screen size
        if (window.innerWidth <= 768) {
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
});