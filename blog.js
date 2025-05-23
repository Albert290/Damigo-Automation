document.addEventListener('DOMContentLoaded', function() {
// Add to existing JS
const searchToggle = document.getElementById('search-toggle');
const closeSearch = document.getElementById('close-search');
const searchPanel = document.querySelector('.search-panel');

searchToggle.addEventListener('click', () => {
    searchPanel.classList.add('active');
});

closeSearch.addEventListener('click', () => {
    searchPanel.classList.remove('active');
});

    // Sample blog data (replace with your actual content)
    const blogPosts = [
        {
            title: "Zoho CRM 2025: AI-Driven Sales Automation",
            content: "The 2025 Zoho CRM update introduces advanced AI features that automate lead scoring and sales forecasting...",
            category: "crm",
            date: "May 20, 2025"
        },
        {
            title: "Automating Financial Workflows in Zoho Books",
            content: "Zoho Books now offers complete automation of invoice processing and payment reconciliation...",
            category: "books",
            date: "April 15, 2025"
        },
        // Add more posts as needed
    ];

    // DOM Elements
    const searchInput = document.getElementById('blog-search');
    const tags = document.querySelectorAll('.tag');
    const featuredGrid = document.querySelector('.featured-grid');
    
    // Real-time Search Functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        filterPosts(searchTerm, getActiveCategory());
    });
    
    // Category Filtering
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            tags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterPosts(searchInput.value.trim().toLowerCase(), this.dataset.category);
        });
    });
    
    // Combined Filter Function
    function filterPosts(searchTerm, category) {
        const filtered = blogPosts.filter(post => {
            const matchesSearch = searchTerm === '' || 
                post.title.toLowerCase().includes(searchTerm) || 
                post.content.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === 'all' || post.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        renderPosts(filtered);
    }
    
    // Render Filtered Posts
    function renderPosts(posts) {
        featuredGrid.innerHTML = posts.map(post => `
            <article class="featured-card">
                <div class="card-content">
                    <span class="category-tag ${post.category}">${getCategoryName(post.category)}</span>
                    <h3>${post.title}</h3>
                    <p class="excerpt">${post.content.substring(0, 120)}...</p>
                    <div class="card-footer">
                        <span class="date">${post.date}</span>
                        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    // Helper Functions
    function getActiveCategory() {
        const activeTag = document.querySelector('.tag.active');
        return activeTag ? activeTag.dataset.category : 'all';
    }
    
    function getCategoryName(category) {
        const names = {
            'crm': 'Zoho CRM',
            'books': 'Zoho Books',
            'projects': 'Zoho Projects',
            'sage': 'Sage Integration'
        };
        return names[category] || 'Automation';
    }
    
    // Initialize
    filterPosts('', 'all');
});

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

    const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav'); // Target the nav element

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        const isExpanded = nav.classList.contains('nav-open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        // Optional: Change icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
        }
        // Optional: Prevent body scroll when menu is open
        // document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
}

    // Add this inside the check for max-width: 768px if needed
document.querySelectorAll('header nav .dropdown > a').forEach(anchor => {
    // Check if it has a dropdown sibling
    const dropdownContent = anchor.nextElementSibling;
    if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
         // Prevent default link behavior only if it's just for toggling
         // anchor.addEventListener('click', (e) => {
         //     if (window.innerWidth <= 768) { // Or your mobile breakpoint
         //         e.preventDefault();
         //         anchor.parentElement.classList.toggle('active');
         //     }
         // });

        // Better: Add a separate toggle icon/button within the <li> for mobile
    }
});

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
});
});

// expandable aticles
document.querySelectorAll('.read-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.category-card');
        const fullContent = card.querySelector('.article-full');
        const excerpt = card.querySelector('.article-excerpt');
        const isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
        
        // Toggle display
        if (isExpanded) {
            fullContent.style.display = 'none';
            excerpt.style.display = '-webkit-box';
            e.currentTarget.querySelector('.read-more').style.display = 'inline';
            e.currentTarget.querySelector('.read-less').style.display = 'none';
        } else {
            fullContent.style.display = 'block';
            excerpt.style.display = 'none';
            e.currentTarget.querySelector('.read-more').style.display = 'none';
            e.currentTarget.querySelector('.read-less').style.display = 'inline';
        }
        
        // Update ARIA attribute
        e.currentTarget.setAttribute('aria-expanded', !isExpanded);
        
        // Scroll to maintain visibility
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

//sharing icons
document.addEventListener('DOMContentLoaded', function() {
    // Social sharing functionality
    const shareButtons = document.querySelectorAll('.social-icon');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const article = this.closest('.insight-article');
            const title = article.querySelector('.article-title').textContent;
            const image = article.querySelector('.article-image img').src;
            const url = window.location.href.split('#')[0] + '#' + article.closest('section').id;
            
            let shareUrl;
            const platform = this.classList.contains('twitter') ? 'twitter' : 
                            this.classList.contains('facebook') ? 'facebook' : 'whatsapp';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
});

// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load thumbnails
    const lazyLoadImages = document.querySelectorAll('.lazy-load');
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.backgroundImage = `url(${img.dataset.src})`;
                    observer.unobserve(img);
                }
            });
        });
        io.observe(target);
    };
    
    lazyLoadImages.forEach(lazyLoad);
    
    // Video play functionality
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const thumbnail = container.querySelector('.video-thumbnail');
        const iframe = container.querySelector('.video-iframe');
        
        thumbnail.addEventListener('click', function() {
            // Hide thumbnail
            thumbnail.style.display = 'none';
            
            // Load iframe only when clicked
            if (!iframe.src) {
                iframe.src = iframe.dataset.src;
            }
            
            // Show iframe
            iframe.style.display = 'block';
        });
    });
    
    // YouTube button tracking
    const youtubeButtons = document.querySelectorAll('.youtube-btn');
    youtubeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('YouTube link clicked:', this.href);
        });
    });
});