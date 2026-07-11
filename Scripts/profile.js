// Profile Carousel with Video
const profileCarousel = document.querySelector('.profile-carousel');

if (profileCarousel) {
    const video = profileCarousel.querySelector('.profile-video');
    const images = profileCarousel.querySelectorAll('.profile-img');
    const allItems = [video, ...images];
    let currentIndex = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function playVideo() {
        video.currentTime = 0;
        video.play().catch(() => {
            // Playback blocked (e.g., autoplay policy)
        });
    }

    function pauseVideo() {
        video.pause();
    }

    function showItem(index) {
        allItems.forEach((item, i) => {
            const isActive = i === index;
            item.classList.toggle('active', isActive);

            // Control video play/pause
            if (item === video) {
                if (isActive) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            }
        });
    }

    function rotateCarousel() {
        const currentItem = allItems[currentIndex];
        const isVideo = currentItem === video;
        const duration = isVideo ? 5000 : 3000;

        currentIndex = (currentIndex + 1) % allItems.length;

        setTimeout(() => {
            showItem(currentIndex);
            rotateCarousel();
        }, duration);
    }

    // Pause video when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && allItems[currentIndex] === video) {
            pauseVideo();
        } else if (!document.hidden && allItems[currentIndex] === video) {
            playVideo();
        }
    });

    // Start carousel (respect prefers-reduced-motion)
    showItem(0);
    if (!prefersReducedMotion) {
        rotateCarousel();
    }
}
