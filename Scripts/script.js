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
            revealObserver.unobserve(entry.target); // Reveal once only
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => navObserver.observe(section));

// Profile Carousel Functionality
const profileCarousel = document.querySelector('.profile-carousel');
const profileImages = profileCarousel.querySelectorAll('.profile-img');
const profileAltTexts = Array.from(profileImages).map(img => img.alt);
let currentProfileIndex = 0;

function rotateProfileImages() {
    profileImages.forEach((img, index) => {
        img.classList.toggle('active', index === currentProfileIndex);
        if (index === currentProfileIndex) {
            profileCarousel.setAttribute('aria-label', profileAltTexts[index]);
        }
    });
    currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
}

// Start profile image rotation
rotateProfileImages();
setInterval(rotateProfileImages, 3000); // Rotate every 3 seconds

// Journey Animation for Read More
const readMoreBtn = document.querySelector('.read-more');
const journeyOverlay = document.querySelector('.journey-overlay');
const journeyText = document.querySelector('.journey-text');
const closeJourneyBtn = document.querySelector('.close-journey');
const journeyContent = "I started from nothing, staring at code that felt like a foreign language. For months, I stumbled, wrestling with errors and self-doubt. But I refused to quit. Coding every day became my mantra, turning confusion into clarity. As a 2nd-year Computer Engineering student at CPUT in Cape Town, I’ve built projects like Java Notepad and BrainRush, fueled by Java and React. Now, I’m charging toward app development, weaving in machine learning to create tech that solves real problems and shapes the future.";

function scrambleText() {
    journeyText.innerHTML = '';
    const letters = journeyContent.split('');
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter; // Preserve spaces
        span.style.left = `${Math.random() * 80 + 10}vw`;
        span.style.top = `${Math.random() * 80 + 10}vh`;
        span.style.transform = `rotate(${Math.random() * 360}deg)`;
        span.style.opacity = 0;
        span.style.transitionDelay = `${index * 20}ms`;
        journeyText.appendChild(span);
    });
}

function organizeText() {
    journeyText.classList.add('organized');
    const spans = journeyText.querySelectorAll('span');
    spans.forEach(span => {
        span.style.left = '';
        span.style.top = '';
        span.style.transform = '';
        span.style.opacity = 1;
    });
}

if (readMoreBtn && journeyOverlay && journeyText && closeJourneyBtn) {
    readMoreBtn.addEventListener('click', () => {
        journeyOverlay.classList.add('active');
        journeyOverlay.setAttribute('aria-hidden', 'false');
        scrambleText();
        setTimeout(organizeText, 1000); // Organize after 1s
    });

    closeJourneyBtn.addEventListener('click', () => {
        journeyOverlay.classList.remove('active');
        journeyOverlay.setAttribute('aria-hidden', 'true');
        journeyText.classList.remove('organized');
        journeyText.innerHTML = '';
    });

    // Keyboard accessibility for closing overlay
    closeJourneyBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            journeyOverlay.classList.remove('active');
            journeyOverlay.setAttribute('aria-hidden', 'true');
            journeyText.classList.remove('organized');
            journeyText.innerHTML = '';
        }
    });
}

// ============================================
// Project Cards: Image Rotation (Crossfade)
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const images = card.querySelectorAll('.project-img');
    if (images.length < 2) return;

    const altTexts = Array.from(images).map(img => img.alt);
    let currentImageIndex = 0;

    function rotateImages() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentImageIndex);
            if (index === currentImageIndex) {
                card.querySelector('.project-img-container').setAttribute('aria-label', altTexts[index]);
            }
        });
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    rotateImages();
    setInterval(rotateImages, 4000);
});

// ============================================
// WST Case Study Modal
// ============================================
const caseStudyBtn = document.querySelector('[data-modal="wst-modal"]');
const modal = document.createElement('div');
modal.id = 'wst-modal';
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
        <button class="modal-close" aria-label="Close case study modal">
            <i class="bi bi-x-lg"></i>
        </button>
        <h2>WST Training Matrix — Case Study</h2>

        <div class="modal-section">
            <h3>Problem</h3>
            <p>A Cape Town trading company tracked warehouse staff training on paper — no visibility, no accountability. Training completion status was invisible to management, making it impossible to enforce compliance or plan workforce development.</p>
        </div>

        <div class="modal-section">
            <h3>Built</h3>
            <p>As the sole developer, I built a full-stack training management platform:</p>
            <ul>
                <li><strong>Frontend:</strong> React + Vite for a fast, responsive UI</li>
                <li><strong>Backend:</strong> Node.js/Express REST API with structured endpoints</li>
                <li><strong>Database:</strong> SQLite for reliable data persistence</li>
                <li><strong>Auth:</strong> JWT-based authentication with role-based access control (RBAC)</li>
                <li><strong>Deployment:</strong> Windows service on the company's own server for data sovereignty and offline capability</li>
            </ul>
        </div>

        <div class="modal-section">
            <h3>Outcome</h3>
            <p>The system is now in daily production use across the company's warehouses. Staff can log training completion, managers can view real-time dashboards, and compliance is finally auditable.</p>
        </div>

        <div class="modal-section modal-images">
            <h3>Screenshots</h3>
            <img src="images/projects/wst1.jpg" alt="WST Training Matrix - Dashboard">
            <img src="images/projects/wst2.jpg" alt="WST Training Matrix - User List">
        </div>
    </div>
`;
document.body.appendChild(modal);

const modalOverlay = modal.querySelector('.modal-overlay');
const modalCloseBtn = modal.querySelector('.modal-close');

if (caseStudyBtn) {
    caseStudyBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
    });
}

modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    caseStudyBtn.focus();
});

modalOverlay.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    caseStudyBtn.focus();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        caseStudyBtn.focus();
    }
});

modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && modal.classList.contains('active')) {
        const focusableElements = modal.querySelectorAll('button, a, [tabindex]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});
