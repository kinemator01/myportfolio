// Profile Carousel with Video
const profileCarousel = document.querySelector('.profile-carousel');

if (profileCarousel) {
    const video = profileCarousel.querySelector('.profile-video');
    const images = profileCarousel.querySelectorAll('.profile-img');
    const allItems = [video, ...images];
    let currentIndex = 0;
    let carouselInterval;

    function showItem(index) {
        allItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        if (allItems[index] === video) {
            video.currentTime = 0;
            video.play();
        }
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

    showItem(0);
    rotateCarousel();
}
