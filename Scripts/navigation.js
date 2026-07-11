// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navList) return;

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside navbar
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
} else {
    initMobileNav();
}

// Smooth Scrolling for Navigation
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

// Scroll Reveal with IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Active Nav Link Highlighting - find section closest to viewport center
const initNavHighlighting = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const updateActiveNav = () => {
        const viewportCenter = window.innerHeight / 2;
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - sectionCenter);

            // Section must be at least partially visible
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            }
        });

        // Highlight the closest section's nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (closestSection) {
            const id = closestSection.getAttribute('id');
            const activeLink = document.querySelector(`a[href="#${id}"].nav-link`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    };

    // Update on scroll with slight debounce
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 50);
    });

    // Run on page load to set initial state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateActiveNav);
    } else {
        updateActiveNav();
    }

    // Also run after a slight delay on load to catch dynamic content
    setTimeout(updateActiveNav, 100);
};

// Initialize nav highlighting when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavHighlighting);
} else {
    initNavHighlighting();
}
