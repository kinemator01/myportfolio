// Bidirectional Scroll Animation System
// Animates elements as they enter viewport, reverses on scroll up

let lastScrollY = 0;
let scrollDirection = 'down';

// Detect scroll direction
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.reveal, .portfolio-item, .timeline-entry, h2, h3, p:not(.hero-text):not(.hero-proof):not(.subtitle), .portfolio-tag, .tech-chip, .portfolio-btn'
    );

    elements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;
        const windowHeight = window.innerHeight;

        // Calculate how much of the element is visible (0 to 1)
        const visibilityRatio = Math.max(
            0,
            Math.min(
                1,
                (windowHeight - elementTop) / (windowHeight + elementRect.height)
            )
        );

        // Element is in viewport
        if (visibilityRatio > 0 && visibilityRatio < 1) {
            // Animate based on scroll direction and position
            const translateY = (1 - visibilityRatio) * 20; // 0-20px translate
            const opacity = visibilityRatio;

            element.style.opacity = opacity;
            element.style.transform = `translateY(${translateY}px)`;
        } else if (visibilityRatio >= 1) {
            // Fully visible - no transform
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        } else if (visibilityRatio <= 0) {
            // Not yet visible
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
        }
    });
};

// Optimize with throttling to avoid performance issues
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Run on load
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('load', animateOnScroll);
