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
            // Remove active class from all filter buttons (both sets)
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

            // Add active class to clicked button and sync to any other matching buttons
            const filterValue = btn.getAttribute('data-filter');
            document.querySelectorAll(`.filter-btn[data-filter="${filterValue}"]`).forEach(b => b.classList.add('active'));

            // (filterValue already set above when syncing active state)

            // Collect current project and all-video cards (query fresh to include dynamically added items)
            const projectCardsLive = Array.from(document.querySelectorAll('.project-card'));
            const allVideoCardsLive = Array.from(document.querySelectorAll('.all-video-card'));
            const allCards = projectCardsLive.concat(allVideoCardsLive);

            // Filter both grids
            allCards.forEach(card => {
                const category = card.getAttribute('data-category') || 'uncategorized';

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

    // Set all 'all' filter buttons active by default (both in work and All Videos)
    document.querySelectorAll('[data-filter="all"]').forEach(b => b.classList.add('active'));
}

/* ============================================
   STAT COUNTER ANIMATION
   ============================================ */

const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(element => {
        const finalCount = parseInt(element.getAttribute('data-count'));
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        const increment = finalCount / (duration / 16); // 60fps
        const startTime = Date.now();
        
        const updateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            currentCount = Math.floor(finalCount * progress);
            element.textContent = currentCount + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = finalCount + '+';
            }
        };
        
        // Use Intersection Observer to trigger when stats section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && currentCount === 0) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(element);
    });
};

// Initialize counter animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

/* ============================================
   PLAY BUTTON FUNCTIONALITY - VIDEO MODAL
   ============================================ */

const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalClose = document.getElementById('videoModalClose');

// Open modal when play button is clicked
playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const videoElement = btn.closest('.project-image').querySelector('video');
        if (videoElement && videoElement.src) {
            modalVideo.src = videoElement.src;
            modalVideo.load(); // Ensure video is loaded
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Don't auto-play - let user control playback
        }
    });  
});

// Close modal functions
const closeVideoModal = () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = '';
};

videoModalClose.addEventListener('click', closeVideoModal);

// Close modal when clicking outside the video
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

/* ============================================
   VIDEO PLAY/PAUSE BUTTON MANAGEMENT
   ============================================ */

projectCards.forEach(card => {
    const video = card.querySelector('video');
    
    if (video) {
        // Ensure videos don't autoplay
        video.autoplay = false;
        video.pause();
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
document.querySelectorAll('.testimonial-card, .project-card, .skill-badge, .experience-item, .why-card, .trust-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

/* ============================================
   CONTACT FORM HANDLING - TWO STEP FORM
   ============================================ */

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    let currentStep = 1;
    const totalSteps = 2;

    // Handle next button (Step 1 → Step 2)
    const nextBtn = document.querySelector('.form-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate Step 1 fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const projectType = document.getElementById('projectType').value;
            
            if (!name || !email || !projectType) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Move to Step 2
            currentStep = 2;
            updateForm();
        });
    }

    // Handle back button (Step 2 → Step 1)
    const backBtn = document.querySelector('.form-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentStep = 1;
            updateForm();
        });
    }

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate all required fields
        if (!data.name || !data.email || !data.projectType || !data.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create email body with all information
        const email = 'himanshsharma046@gmail.com';
        const subject = `New Portfolio Inquiry: ${data.name}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nProject Type: ${data.projectType}\n\nProject Details:\n${data.message}`;
        
        // Show success message
        showFormSuccess();
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            currentStep = 1;
            updateForm();
            
            // Send email
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }, 2000);
    });

    // Update form UI based on current step
    function updateForm() {
        // Update form steps visibility
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update progress indicator
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            }
        });
    }

    // Show success message
    function showFormSuccess() {
        const formWrapper = document.querySelector('.contact-form-wrapper');
        const successMessage = document.getElementById('formSuccess');
        
        if (successMessage && formWrapper) {
            contactForm.style.display = 'none';
            successMessage.classList.remove('hidden');
        }
    }
}

/* ============================================
   CONTACT FORM HANDLING (OLD - FALLBACK)
   ============================================ */

// This handler is overridden by the new 2-step form above

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

// Lazy load videos - pause when out of view, but don't auto-play
const videos = document.querySelectorAll('video');
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.pause();
            }
            // Videos stay paused - user controls playback
        });
    }, { threshold: 0.5 });
    
    videos.forEach(video => {
        video.pause(); // Explicitly pause all videos on load
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

/* ============================================
   ALL VIDEOS SECTION GENERATION
   ============================================ */



// -----------------------------
// Custom controls utilities
// -----------------------------

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function createControlsForCard(card) {
    if (!card) return;
    const video = card.querySelector('video');
    if (!video) return;

    const mediaWrap = card.querySelector('.project-image') || card.querySelector('.all-video-media') || card;
    if (!mediaWrap) return;

    // avoid adding controls twice
    if (mediaWrap.querySelector('.video-controls')) return;

    // ensure positioning
    if (getComputedStyle(mediaWrap).position === 'static') {
        mediaWrap.style.position = 'relative';
    }

    const controls = document.createElement('div');
    controls.className = 'video-controls';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'vc-btn vc-play';
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    controls.appendChild(playBtn);

    const muteBtn = document.createElement('button');
    muteBtn.type = 'button';
    muteBtn.className = 'vc-btn vc-mute';
    muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    controls.appendChild(muteBtn);

    const fsBtn = document.createElement('button');
    fsBtn.type = 'button';
    fsBtn.className = 'vc-btn vc-fs';
    fsBtn.innerHTML = '<i class="fas fa-expand"></i>';
    controls.appendChild(fsBtn);

    const downloadLink = document.createElement('a');
    downloadLink.className = 'vc-btn vc-download';
    downloadLink.innerHTML = '<i class="fas fa-download"></i>';
    const src = video.getAttribute('src') || video.currentSrc || '';
    downloadLink.href = src;
    downloadLink.setAttribute('download', '');
    controls.appendChild(downloadLink);

    const durationSpan = document.createElement('span');
    durationSpan.className = 'vc-duration';
    durationSpan.textContent = '';
    controls.appendChild(durationSpan);

    mediaWrap.appendChild(controls);

    // handlers
    playBtn.addEventListener('click', () => {
        if (video.paused) video.play(); else video.pause();
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    fsBtn.addEventListener('click', async () => {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else if (video.requestFullscreen) await video.requestFullscreen();
            else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        } catch (e) {
            console.warn('Fullscreen failed', e);
        }
    });

    // update duration and download when metadata loads
    if (video.readyState >= 1) {
        durationSpan.textContent = formatTime(video.duration);
        if (!downloadLink.href) downloadLink.href = video.currentSrc || video.src || '';
    } else {
        video.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(video.duration);
            if (!downloadLink.href) downloadLink.href = video.currentSrc || video.src || '';
        });
    }

    // sync with native overlay play button if present
    const nativePlay = card.querySelector('.play-btn');
    video.addEventListener('play', () => {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (nativePlay) nativePlay.style.opacity = '0';
    });
    video.addEventListener('pause', () => {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (nativePlay) nativePlay.style.opacity = '1';
    });

    // clicking video toggles play/pause
    video.addEventListener('click', () => {
        if (video.paused) video.play(); else video.pause();
    });
}

function addControlsToProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        createControlsForCard(card);
    });
}

function addControlsToAllVideos() {
    document.querySelectorAll('.all-video-card').forEach(card => {
        createControlsForCard(card);
    });
}


/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Getting form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value.trim();

        // Validate required fields
        if (!name || !email || !projectType || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Create email body
        const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Project Type: ${projectType}

Message:
${message}
        `.trim();

        // Create mailto link (fallback method)
        const mailtoLink = `mailto:himanshsharma046@gmail.com?subject=New Project Inquiry from ${name}&body=${encodeURIComponent(emailBody)}`;

        // Try FormSubmit API (alternative free service)
        const formData = new FormData(form);
        
        // Send via FormSubmit
        fetch('https://formspree.io/f/xnqyzrzy', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
                form.reset();
            } else {
                // Fallback to mailto
                window.location.href = mailtoLink;
            }
        }).catch(error => {
            console.log('Using mailto fallback');
            window.location.href = mailtoLink;
        });
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        addControlsToProjectCards();
        initContactForm();
    });
} else {
    addControlsToProjectCards();
    initContactForm();
}
