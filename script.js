/* ============================================
   DOM ELEMENTS
   ============================================ */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navbar = document.querySelector('.navbar');
const playBtns = document.querySelectorAll('.play-btn');

/* ============================================
   HAMBURGER MENU TOGGLE
   ============================================ */

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

/* ============================================
   PROJECT FILTER FUNCTIONALITY
   ============================================ */

if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set "All" as active by default
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
    }
}

/* ============================================
   PLAY BUTTON FUNCTIONALITY
   ============================================ */

playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const video = btn.closest('.project-image').querySelector('video');
        
        if (video) {
            if (video.paused) {
                video.play();
                btn.style.opacity = '0';
            } else {
                video.pause();
                btn.style.opacity = '1';
            }
        }
    });
});

/* ============================================
   VIDEO PLAY/PAUSE BUTTON MANAGEMENT
   ============================================ */

projectCards.forEach(card => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.play-btn');
    
    if (video && playBtn) {
        // Hide play button when video plays
        video.addEventListener('play', () => {
            playBtn.style.opacity = '0';
            playBtn.style.pointerEvents = 'none';
        });
        
        // Show play button when video pauses
        video.addEventListener('pause', () => {
            playBtn.style.opacity = '1';
            playBtn.style.pointerEvents = 'auto';
        });
        
        // Reset play button on video end
        video.addEventListener('ended', () => {
            playBtn.style.opacity = '1';
            playBtn.style.pointerEvents = 'auto';
            video.currentTime = 0;
        });
    }
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.testimonial-card, .project-card, .skill-badge, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

/* ============================================
   CONTACT FORM HANDLING (IF APPLICABLE)
   ============================================ */

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Find mailto link and send
        const email = 'himanshsharma046@gmail.com';
        const subject = `New Portfolio Inquiry: ${data.name || 'Inquiry'}`;
        const body = `Name: ${data.name || 'Not provided'}\nEmail: ${data.email || 'Not provided'}\n\nMessage:\n${data.message || 'No message'}`;
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

/* ============================================
   STAGGER ANIMATIONS ON PAGE LOAD
   ============================================ */

window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach((el, index) => {
        const currentAnimation = el.style.animation;
        el.style.animation = `${currentAnimation}, none`;
        el.offsetHeight; // Trigger reflow
        el.style.animation = currentAnimation;
    });
});

/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

// Lazy load videos
const videos = document.querySelectorAll('video');
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            } else {
                entry.target.pause();
            }
        });
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Update mobile styles if needed
    if (window.innerWidth < 768) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

/* ============================================
   INITIALIZATION
   ============================================ */

console.log('Portfolio script loaded successfully');
