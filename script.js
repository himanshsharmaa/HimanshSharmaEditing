/* ============================================
   SMOOTH SCROLL & INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initIntersectionObserver();
    initVideoHovers();
});

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all video cards
    document.querySelectorAll('.video-card').forEach(card => {
        observer.observe(card);
    });

    // Observe section titles
    document.querySelectorAll('.section-title, .section-subtitle').forEach(elem => {
        observer.observe(elem);
    });
}

// Enhanced video hover effects
function initVideoHovers() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        
        if (!video) return;
        
        // Play video on hover
        container.addEventListener('mouseenter', function() {
            if (video.paused) {
                video.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                });
            }
        });
        
        // Optional: pause on leave (commented out to let user control)
        // container.addEventListener('mouseleave', function() {
        //     video.pause();
        // });
    });
}

// Add scroll event for navbar effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Performance: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Preload videos for better performance
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to next video section with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = document.querySelectorAll('.short-form-section, .long-form-section, .about-section');
        const currentScroll = window.scrollY;
        
        let nextSection = null;
        if (e.key === 'ArrowDown') {
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    nextSection = section;
                    break;
                }
            }
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop < currentScroll - 100) {
                    nextSection = sections[i];
                    break;
                }
            }
        }
        
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

console.log('Video Editor Portfolio - Loaded');
