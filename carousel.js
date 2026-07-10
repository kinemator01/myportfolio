// Vula Access carousel slides
const vulaSlides = [
    {
        img: 'images/Vula%20Access/slide-01.jpg',
        tag: 'Pitch Deck',
        title: 'Vula Access',
        desc: 'Opening the door to higher education, one SMS at a time. A free, MTN-powered platform that matches every learner to the bursaries they qualify for — built for the MTN Opportunity Mixer 2026.'
    },
    {
        img: 'images/Vula%20Access/slide-02.jpg',
        tag: 'Pitch Deck',
        title: 'The problem we\'re solving',
        desc: 'Every year, thousands of matric qualifiers who could be funded never apply — not because they don\'t qualify, but because the system to find that funding was never built for them.'
    },
    {
        img: 'images/Vula%20Access/slide-03.jpg',
        tag: 'Pitch Deck',
        title: 'Why this matters now',
        desc: 'Access to higher education moves household economics, community safety, and public health at once — and sits squarely inside South Africa\'s National Development Plan.'
    },
    {
        img: 'images/Vula%20Access/slide-04.jpg',
        tag: 'Pitch Deck',
        title: 'Introducing Vula Access',
        desc: 'The missing discovery and application layer between existing funding and the students who qualify for it. Discover, apply, and track — free to use, on any phone.'
    },
    {
        img: 'images/Vula%20Access/slide-05.jpg',
        tag: 'Pitch Deck',
        title: 'From sign-up to submission',
        desc: 'Five steps from opening the app to a complete application — with zero data cost and no smartphone required, thanks to USSD support on any device.'
    },
    {
        img: 'images/Vula%20Access/slide-06.jpg',
        tag: 'Pitch Deck',
        title: 'Built on MTN\'s network',
        desc: 'Data cost is one of the barriers we\'re solving, so MTN\'s own network is the delivery mechanism — zero-rated data, SMS reminders, and USSD access for feature phones.'
    },
    {
        img: 'images/Vula%20Access/slide-07.jpg',
        tag: 'Pitch Deck',
        title: 'One platform, five challenge areas',
        desc: 'By targeting the root cause — access to education — Vula Access moves the needle across unemployment, crime, substance abuse, and mental health, not just one line item.'
    },
    {
        img: 'images/Vula%20Access/slide-08.jpg',
        tag: 'Pitch Deck',
        title: 'From hackathon to national rollout',
        desc: 'A sustainable model built on an MTN data partnership and institutional licensing — designed to outlast prize money and scale province by province.'
    },
    {
        img: 'images/Vula%20Access/slide-09.jpg',
        tag: 'Live Demo',
        title: 'The working platform',
        desc: 'Not a mock-up — a functioning product. The following screens walk the full student journey, from first visit to funded application.'
    },
    {
        img: 'images/Vula%20Access/slide-10.jpg',
        tag: 'Product Demo',
        title: 'Landing page',
        desc: 'A single front door for both audiences: students searching for funding, and providers looking to reach them — with sign-in built around a simple, low-friction flow.'
    },
    {
        img: 'images/Vula%20Access/slide-11.jpg',
        tag: 'Product Demo',
        title: 'Onboarding & roles',
        desc: 'Account creation asks one question first — student or funder — and shapes the entire experience around that answer from the first screen.'
    },
    {
        img: 'images/Vula%20Access/slide-12.jpg',
        tag: 'Product Demo',
        title: 'Student dashboard',
        desc: 'Profile strength, matched bursaries, and upcoming deadlines in one view — so a student always knows exactly where they stand and what to do next.'
    },
    {
        img: 'images/Vula%20Access/slide-13.jpg',
        tag: 'Product Demo',
        title: 'Browse bursaries',
        desc: 'Every opportunity in the database, searchable and filterable — each one ranked with a personal match score built from the student\'s own profile.'
    },
    {
        img: 'images/Vula%20Access/slide-14.jpg',
        tag: 'Product Demo',
        title: 'Application tracking',
        desc: 'Drafts, submissions, and reviews tracked with live progress — so paperwork stops being the reason a qualifying student drops out.'
    },
    {
        img: 'images/Vula%20Access/slide-15.jpg',
        tag: 'Product Demo',
        title: 'Reminders & notifications',
        desc: 'Deadline alerts delivered in-app and by SMS — reaching students even without data, so nothing slips through the cracks.'
    },
    {
        img: 'images/Vula%20Access/slide-16.jpg',
        tag: 'Product Demo',
        title: 'The student profile',
        desc: 'Personal details and academic performance in one living profile — the engine behind every match score and every pre-filled application.'
    }
];

class VulaCarousel {
    constructor() {
        this.currentSlide = 0;
        this.carouselItem = document.querySelector('.vula-carousel');

        if (!this.carouselItem) return;

        this.imageContainer = this.carouselItem.querySelector('.carousel-wrapper');
        this.contentArea = this.carouselItem.querySelector('.carousel-slide-content');
        this.dotsContainer = this.carouselItem.querySelector('.carousel-dots');
        this.prevBtn = this.carouselItem.querySelector('.carousel-prev');
        this.nextBtn = this.carouselItem.querySelector('.carousel-next');

        this.init();
    }

    init() {
        // Store slide counter element
        this.slideCounter = this.carouselItem.querySelector('.slide-num');
        this.slideTotal = this.carouselItem.querySelector('.slide-total');

        if (this.slideTotal) {
            this.slideTotal.textContent = String(vulaSlides.length).padStart(2, '0');
        }

        this.createDots();
        this.updateSlide(0);
        this.attachEventListeners();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        vulaSlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            dot.addEventListener('click', () => this.updateSlide(idx));
            this.dotsContainer.appendChild(dot);
        });
    }

    updateSlide(idx) {
        const slide = vulaSlides[idx];
        this.currentSlide = idx;

        // Update image
        const img = this.imageContainer.querySelector('.carousel-image');
        img.classList.remove('active');
        setTimeout(() => {
            img.src = slide.img;
            img.classList.add('active');
        }, 150);

        // Update content
        this.contentArea.querySelector('.portfolio-tag').textContent = slide.tag;
        this.contentArea.querySelector('h3').textContent = slide.title;
        this.contentArea.querySelector('p').textContent = slide.desc;

        // Update slide counter
        if (this.slideCounter) {
            this.slideCounter.textContent = String(idx + 1).padStart(2, '0');
        }

        // Update dots
        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % vulaSlides.length;
        this.updateSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + vulaSlides.length) % vulaSlides.length;
        this.updateSlide(prev);
    }

    attachEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());


        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carouselItem.querySelector(':hover')) return;
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
        });
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VulaCarousel());
} else {
    new VulaCarousel();
}
