document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            button.classList.add('active');
            
            // Show the corresponding tab pane
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send this data to your server
            console.log('Form submitted with values:', {
                name,
                email,
                company,
                phone,
                interest,
                message
            });
            
            // Show success message (you can replace this with your own implementation)
            alert('Thank you for your message! Our team will get back to you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize any animation on scroll if needed
    function revealOnScroll() {
        const elements = document.querySelectorAll('.section-header, .feature-content, .stat-card, .user-card, .comparison-table-wrapper, .conclusion-content');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add visible class when elements come into view
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once on load in case elements are already in view
    revealOnScroll();
});