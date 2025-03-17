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
});
