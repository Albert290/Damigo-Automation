document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    function initSlider() {
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
    }
    
    // Show the current slide
    function showSlide(index) {
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].style.display = 'flex';
        dots[index].classList.add('active');
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonialCards.length - 1;
        }
        showSlide(currentSlide);
    }
    
    // Next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialCards.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });
    
    // Initialize the slider
    initSlider();
    
    // Animate stats when in viewport
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    // Animation function for counting up
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format the numbers appropriately
            if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = value + '+';
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const value = element.textContent;
                let endValue;
                
                // Extract the numeric value
                if (value.includes('+')) {
                    endValue = parseInt(value);
                } else if (value.includes('%')) {
                    endValue = parseInt(value);
                } else {
                    endValue = parseInt(value);
                }
                
                // Start the animation
                animateValue(element, 0, endValue, 2000);
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat numbers
    statNumbers.forEach(number => {
        observer.observe(number);
    });
});