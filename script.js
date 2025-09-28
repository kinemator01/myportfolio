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

// Typing Animation
const typingElement = document.querySelector('.typing-text');
const texts = ['Software Engineer', 'Web Developer', 'AI Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, 50);
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else {
            setTimeout(type, 100);
        }
    }
}

// Start typing animation
type();

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

// Project Images Alternating Functionality
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const images = card.querySelectorAll('.project-img');
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

    // Start rotating images for this card
    rotateImages();
    setInterval(rotateImages, 3000); // Rotate every 3 seconds
});

// Projects Gallery Scroll Functionality
const galleryTrack = document.querySelector('.gallery-track');
const galleryLeftBtn = document.querySelector('.gallery-btn-left');
const galleryRightBtn = document.querySelector('.gallery-btn-right');
const cardWidth = 300; // Matches .project-card flex: 0 0 300px
const scrollAmount = cardWidth + 24; // Card width + gap (1.5rem = 24px)

// Debugging: Log elements to ensure they are selected
console.log('Gallery Track:', galleryTrack);
console.log('Left Button:', galleryLeftBtn);
console.log('Right Button:', galleryRightBtn);

if (galleryTrack && galleryLeftBtn && galleryRightBtn) {
    // Scroll left
    galleryLeftBtn.addEventListener('click', () => {
        console.log('Left button clicked');
        const currentScroll = galleryTrack.scrollLeft;
        const newScroll = Math.max(0, currentScroll - scrollAmount);
        galleryTrack.scrollTo({ left: newScroll, behavior: 'smooth' });
    });

    // Scroll right
    galleryRightBtn.addEventListener('click', () => {
        console.log('Right button clicked');
        const currentScroll = galleryTrack.scrollLeft;
        const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
        const newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
        galleryTrack.scrollTo({ left: newScroll, behavior: 'smooth' });
    });

    // Keyboard accessibility for gallery buttons
    [galleryLeftBtn, galleryRightBtn].forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log(`${btn.classList.contains('gallery-btn-left') ? 'Left' : 'Right'} button key pressed`);
                const currentScroll = galleryTrack.scrollLeft;
                const maxScroll = galleryTrack.scrollWidth - galleryTrack.clientWidth;
                let newScroll;
                if (btn.classList.contains('gallery-btn-left')) {
                    newScroll = Math.max(0, currentScroll - scrollAmount);
                } else {
                    newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
                }
                galleryTrack.scrollTo({ left: newScroll, behavior: 'smooth' });
            }
        });
    });
} else {
    console.error('Gallery elements not found');
}

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

// View Project Links: Only prevent default for placeholder links
document.querySelectorAll('.view-project').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href === '#projects' || !href.startsWith('http')) {
            e.preventDefault();
            alert('Please add a valid GitHub or live demo link for this project.');
        }
        // Valid GitHub links (starting with 'http') navigate normally
    });
});

// Basic Form Submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    // For real submission, submit to Formspree
    alert('Form submitted! (Demo - integrate with Formspree for real use)');
    form.reset();
});
