// Bidirectional Scroll Animation System
// Text fades in as it enters viewport, fades out as it exits
// Works in both scroll directions - only visible while in viewport

const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.reveal, .portfolio-item, .timeline-entry, h2, h3, p:not(.hero-text):not(.hero-proof):not(.subtitle), .portfolio-tag, .tech-chip, .portfolio-btn'
    );

    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;
        const elementHeight = elementRect.height;

        // Calculate progress as element moves through viewport
        // 0 = element is below viewport (not yet visible)
        // 1 = element fully enters viewport from below
        // 1 = element stays fully visible while in middle of viewport
        // 0 = element exits viewport going up
        // 0 = element is above viewport (fully scrolled past)

        let animationProgress = 0;

        // Element entering from below (scrolling down)
        if (elementTop <= windowHeight && elementBottom >= 0) {
            // Element is touching or inside viewport
            if (elementTop > 0) {
                // Element entering from bottom
                animationProgress = 1 - (elementTop / windowHeight);
            } else if (elementTop <= 0 && elementBottom >= windowHeight) {
                // Element fully covers viewport (fully visible)
                animationProgress = 1;
            } else if (elementBottom >= 0) {
                // Element exiting from top
                animationProgress = elementBottom / windowHeight;
            }
        }

        // Clamp to 0-1
        animationProgress = Math.max(0, Math.min(1, animationProgress));

        // Apply animation: fade in/out, slide up from below or down above
        const opacity = animationProgress;
        const translateY = (1 - animationProgress) * 20; // 0-20px slide

        element.style.opacity = opacity;
        element.style.transform = `translateY(${translateY}px)`;
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
