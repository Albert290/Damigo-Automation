document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for partners section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll animation
    function handleScroll() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('show');
            }
        });
    }
    
    // Initial check on page load
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero image hover effect enhancement
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('mousemove', function(e) {
            const xPos = (e.clientX / window.innerWidth) - 0.5;
            const yPos = (e.clientY / window.innerHeight) - 0.5;
            
            const image = this.querySelector('.main-image');
            image.style.transform = `translateY(-8px) rotateX(${yPos * 10}deg) rotateY(${xPos * -10}deg)`;
        });
        
        heroImage.addEventListener('mouseleave', function() {
            const image = this.querySelector('.main-image');
            image.style.transform = '';
        });
    }
    
    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add floating effect to CTA buttons
    function floatAnimation() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
        ctaButtons.forEach(button => {
            setTimeout(() => {
                button.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    button.style.transform = 'translateY(0)';
                }, 500);
            }, Math.random() * 2000);
        });
    }
    
    // Start floating animation and repeat every 4 seconds
    floatAnimation();
    setInterval(floatAnimation, 4000);
});