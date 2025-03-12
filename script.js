// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Scroll Effects
const scrollEffects = () => {
    const navbar = document.querySelector('.navbar');
    const animatedElements = document.querySelectorAll('.animated-element');
    
    window.addEventListener('scroll', () => {
        // Navbar Effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animated Elements
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    });
}

// Parallax Effect
const parallaxEffect = () => {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollValue * 0.5}px)`;
        }
    });
}

// Review Card Hover Effect
const reviewCardEffect = () => {
    const cards = document.querySelectorAll('.review-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--card-shadow)';
        });
    });
}

// Poll System
const pollSystem = () => {
    const pollOptions = document.querySelectorAll('.poll-option');
    const voteCountElement = document.getElementById('vote-count');
    let hasVoted = false;
    
    // Sample initial data
    const pollData = {
        options: [
            { id: 1, votes: 45 },
            { id: 2, votes: 28 },
            { id: 3, votes: 37 },
            { id: 4, votes: 19 }
        ],
        totalVotes: 129
    };
    
    // Update UI with initial data
    const updatePollUI = () => {
        voteCountElement.textContent = pollData.totalVotes;
        
        pollOptions.forEach((option, index) => {
            const optionId = parseInt(option.dataset.optionId);
            const optionData = pollData.options.find(opt => opt.id === optionId);
            
            if (optionData) {
                const percentage = Math.round((optionData.votes / pollData.totalVotes) * 100);
                const progressBar = option.querySelector('.option-progress');
                const percentageText = option.querySelector('.option-percentage');
                
                progressBar.style.width = `${percentage}%`;
                percentageText.textContent = `${percentage}%`;
            }
        });
    };
    
    // Initialize poll
    updatePollUI();
    
    // Handle voting
    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (!hasVoted) {
                const optionId = parseInt(this.dataset.optionId);
                const optionData = pollData.options.find(opt => opt.id === optionId);
                
                if (optionData) {
                    optionData.votes++;
                    pollData.totalVotes++;
                    
                    // Mark as selected
                    pollOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Update UI
                    updatePollUI();
                    
                    // Set voted flag
                    hasVoted = true;
                }
            }
        });
    });
}

// Animate on scroll for all elements with animation classes
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right');
    
    const checkIfInView = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
            }
        });
    };
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView();
}

// Newsletter Form Submission
const newsletterForm = () => {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                // Here you would typically send this to your backend
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make hero section elements visible on load
    const heroElements = document.querySelectorAll('.hero-content .animated-element');
    setTimeout(() => {
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 500);
    
    navSlide();
    scrollEffects();
    parallaxEffect();
    reviewCardEffect();
    pollSystem();
    animateOnScroll();
    newsletterForm();
    
    // Burger menu toggle animation
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
    });
});

// Add toggle class to burger
const burgerAnimation = () => {
    const burger = document.querySelector('.burger');
    burger.classList.toggle('toggle');
};

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Additional burger animation styles
document.head.insertAdjacentHTML('beforeend', `
<style>
.burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.burger.toggle .line2 {
    opacity: 0;
}

.burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
}
</style>
`);
// Frame-by-frame scroll animation for hero section
const setupScrollAnimation = () => {
    const html = document.documentElement;
    const heroSection = document.querySelector('.hero-section');
    
    // Only proceed if hero section exists
    if (!heroSection) return;
    
    // Create canvas for frame animation
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    
    // Insert canvas before the first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    const context = canvas.getContext('2d');
    
    // Number of frames in the animation sequence
    const frameCount = 60;
    const currentFrame = index => (
        `https://www.example.com/frames/frame-${index.toString().padStart(4, '0')}.jpg`
    );
    
    // Preload images
    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                // When first image is loaded, draw it
                if (i === 1) {
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            };
            frameImages.push(img);
        }
    };
    
    // Array to store the frame images
    const frameImages = [];
    
    // Draw the current frame based on scroll position
    const updateImage = index => {
        if (frameImages[index] && frameImages[index].complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(frameImages[index], 0, 0, canvas.width, canvas.height);
        }
    };
    
    // Handle scroll event to update the animation frame
    window.addEventListener('scroll', () => {
        // Calculate which frame to show based on scroll position
        const scrollTop = html.scrollTop;
        const maxScrollTop = heroSection.offsetHeight;
        const scrollFraction = Math.min(1, scrollTop / maxScrollTop);
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );
        
        requestAnimationFrame(() => updateImage(frameIndex));
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Redraw current frame after resize
        const scrollTop = html.scrollTop;
        const maxScrollTop = heroSection.offsetHeight;
        const scrollFraction = Math.min(1, scrollTop / maxScrollTop);
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );
        
        updateImage(frameIndex);
    });
    
    // Start preloading images
    preloadImages();
};

// Add a custom cursor effect for interactive elements
const setupCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    // Add styles for custom cursor
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            z-index: 9999;
            opacity: 0;
        }
        
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
        }
        
        body:hover .custom-cursor,
        body:hover .cursor-dot {
            opacity: 1;
        }
        
        .clickable {
            cursor: none;
        }
        
        .custom-cursor.active {
            width: 20px;
            height: 20px;
            background-color: rgba(0, 102, 204, 0.2);
        }
    </style>
    `);
    
    // Track mouse movement
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add effects for interactive elements
    const clickableElements = document.querySelectorAll('a, button, .poll-option, .review-card, .cta-button');
    clickableElements.forEach(element => {
        element.classList.add('clickable');
        
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
};

// Add a dark mode toggle
const setupDarkMode = () => {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(darkModeToggle);
    
    // Add styles for dark mode toggle
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .dark-mode-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--background-dark);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .dark-mode-toggle:hover {
            transform: rotate(45deg);
        }
        
        body.dark-mode {
            --background-color: #121212;
            --background-light: #1e1e1e;
            --background-dark: #000000;
            --text-color: #e0e0e0;
            --text-light: #b0b0b0;
            --border-color: #333333;
            --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .navbar {
            background-color: rgba(0, 0, 0, 0.9);
        }
        
        body.dark-mode .review-card {
            background-color: #1e1e1e;
        }
        
        body.dark-mode .dark-mode-toggle {
            background-color: var(--primary-color);
            content: '☀️';
        }
    </style>
    `);
    
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    });
};

// Add these new functions to the DOM loaded event
document.addEventListener('DOMContentLoaded', () => {
    // Previous initialization code...
    
    // Add new features
    setupScrollAnimation();
    setupCustomCursor();
    setupDarkMode();
});
