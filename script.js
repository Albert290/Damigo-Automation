// ====== Loader Handling ======
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Debug] DOM Content Loaded');
    
    const loader = document.getElementById('pageLoader');
    if (!loader) {
        console.error('Loader element not found!');
        return;
    }

    // Show loader immediately
    loader.style.display = 'flex';
    
    // Hide loader when everything is loaded
    window.addEventListener('load', () => {
        console.log('[Debug] Window loaded');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            console.log('[Debug] Loader hidden');
        }, 500);
    });

    // Safety timeout
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            console.warn('[Debug] Loader timeout triggered');
            loader.style.display = 'none';
        }
    }, 4000);
});

// Navigation Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickInsideHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickInsideHamburger && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
    
    // Close menu when nav link is clicked
    const navLinkElements = navLinks.querySelectorAll('a');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  });

// Function to handle responsive image loading hero section
function handleResponsiveImage() {
    const imageContainer = document.querySelector('.image-container');
    const windowWidth = window.innerWidth;
    
    // Check if we're on a medium screen or larger
    if (windowWidth >= 768) {
      imageContainer.style.display = 'flex';
    } else {
      imageContainer.style.display = 'none';
    }
  }
  
  // Initialize when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveImage();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResponsiveImage);
  });

// ====== Smooth Scroll ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        console.log(`[Debug] Smooth scroll to: ${this.getAttribute('href')}`);
        
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) {
            console.warn(`[Warning] Scroll target not found: ${this.getAttribute('href')}`);
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listeners to all tab triggers
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        // Get the tab ID this trigger controls
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all triggers and contents
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to the clicked trigger
        this.classList.add('active');
        
        // Add active class to the corresponding content
        document.getElementById(tabId).classList.add('active');
      });
    });
  });

// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    feather.replace();
    
    // Add hover effect for the button
    const button = document.querySelector('.btn.group');
    const icon = button.querySelector('[data-feather="chevron-right"]');
    
    button.addEventListener('mouseenter', function() {
        icon.style.transform = 'translateX(4px)';
        icon.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        icon.style.transform = 'translateX(0)';
    });
});

// ====== Service Card Interactions ======
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        console.log('[Debug] Service card hover start');
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        console.log('[Debug] Service card hover end');
    });
});

// Add hover effect for the services button
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.btn.group');
    const icon = button.querySelector('svg');
    
    button.addEventListener('mouseenter', function() {
        icon.style.transform = 'translateX(4px)';
        icon.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        icon.style.transform = 'translateX(0)';
    });
});

// ====== Intersection Observer ======
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`[Debug] Element visible: ${entry.target.className}`);
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .section-header').forEach(el => {
    observer.observe(el);
});

// ====== Form Handling (Placeholder) ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('[Debug] Form submission started');
        // Add your form handling logic here
    });
}

// Add any necessary JavaScript interactions here
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects or other interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });
  });

// ====== FAQ Handling ======
document.addEventListener('DOMContentLoaded', function() {
    // Select all FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Function to toggle FAQ item
    function toggleFAQ(question) {
      // Get the answer associated with the clicked question
      const answer = question.nextElementSibling;
      
      // Toggle active class on question
      question.classList.toggle('active');
      
      // Toggle show class on answer
      answer.classList.toggle('show');
      
      // Toggle maxHeight for animation
      if (answer.classList.contains('show')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
      
      // Update ARIA attributes
      const isExpanded = question.classList.contains('active');
      question.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        // Get the current active question, if any
        const currentActive = document.querySelector('.faq-question.active');
        const currentActiveAnswer = document.querySelector('.faq-answer.show');
        
        // If there's an active question and it's not the one clicked, close it
        if (currentActive && currentActive !== this) {
          currentActive.classList.remove('active');
          currentActive.setAttribute('aria-expanded', 'false');
          
          if (currentActiveAnswer) {
            currentActiveAnswer.classList.remove('show');
            currentActiveAnswer.style.maxHeight = '0';
          }
        }
        
        // Toggle the clicked question
        toggleFAQ(this);
      });
    });
    
    // Add keyboard accessibility
    faqQuestions.forEach(question => {
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.setAttribute('aria-expanded', 'false');
      
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
    
    // Initialize initial state of all answers
    document.querySelectorAll('.faq-answer').forEach(answer => {
      answer.style.maxHeight = '0';
    });
    
    console.log('FAQ script loaded successfully');
  });