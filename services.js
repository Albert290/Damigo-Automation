document.addEventListener("DOMContentLoaded", function() {
    // Loader Animation
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('loaded');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 1500);
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    if (menuToggle && header) {
        menuToggle.addEventListener('click', function() {
            header.classList.toggle('nav-open');
        });
    }

    // Dropdown Menu Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Highlight Active Navigation Link
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (window.location.pathname.endsWith(linkPath) || (window.location.pathname === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Initialize AOS (Animation on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 300,
            easing: 'ease-in-out',
            once: true
        });
    } else {
        console.warn("AOS library not loaded.");
    }

    // Service Info Toggle on Touch Devices
    const serviceIcons = document.querySelectorAll('.service-info .icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            const serviceInfo = this.closest('.service-info');
            if (serviceInfo) {
                document.querySelectorAll('.service-info.active').forEach(info => {
                    if (info !== serviceInfo) {
                        info.classList.remove('active');
                    }
                });
                serviceInfo.classList.toggle('active');
            }
        });
    });

    // Quote Modal Toggle
    const quoteBtn = document.getElementById('quoteBtn');
    const quoteModal = document.getElementById('quoteModal');
    const closeBtn = document.querySelector('.close');
    const closeModalBtn = document.getElementById('closeModal');

    function closeModal() {
        if (quoteModal) {
            quoteModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (quoteBtn && quoteModal && closeBtn && closeModalBtn) {
        quoteBtn.addEventListener('click', function() {
            quoteModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            document.getElementById('step1')?.classList.add('active');
        });

        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Email Validation Function
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Contact Form Submission (Example)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const emailInput = document.getElementById('email');
            if (emailInput && !isValidEmail(emailInput.value)) {
                event.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }
});
