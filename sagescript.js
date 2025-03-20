// sage-service.js
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header if needed
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile responsiveness for tabs
    function checkTabsOverflow() {
        const tabsNav = document.querySelector('.tabs-nav');
        if (tabsNav) {
            if (window.innerWidth < 768) {
                tabsNav.classList.add('scrollable');
            } else {
                tabsNav.classList.remove('scrollable');
            }
        }
    }
    
    // Check on load and resize
    checkTabsOverflow();
    window.addEventListener('resize', checkTabsOverflow);
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.audience-card, .point, .feature-tabs');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.9) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add a CSS class for the animation
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Initial check
    checkIfInView();
});