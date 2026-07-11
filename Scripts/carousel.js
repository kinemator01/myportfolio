class VulaCarousel {
    constructor() {
        this.carouselItem = document.querySelector('.vula-carousel');

        if (!this.carouselItem) return;

        this.imageContainer = this.carouselItem.querySelector('.carousel-wrapper');
        this.contentArea = this.carouselItem.querySelector('.carousel-content');
        this.controlsContainer = this.carouselItem.querySelector('.carousel-controls-inline');

        this.init();
    }

    init() {
        this.loadImage();
        this.hideControls();
    }

    loadImage() {
        const img = this.imageContainer.querySelector('.carousel-image');
        img.src = '../images/Banele/black&gold.png';
        img.classList.add('active');
    }

    hideControls() {
        if (this.controlsContainer) {
            this.controlsContainer.style.display = 'none';
        }
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VulaCarousel());
} else {
    new VulaCarousel();
}
