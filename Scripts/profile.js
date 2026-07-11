// Profile Carousel with Video
const profileCarousel = document.querySelector('.profile-carousel');

if (profileCarousel) {
    const video = profileCarousel.querySelector('.profile-video');
    const images = profileCarousel.querySelectorAll('.profile-img');
    const allItems = [video, ...images];
    let currentIndex = 0;

    function showItem(index) {
        allItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        if (allItems[index] === video) {
            video.play();
        }
    }

    function nextItem() {
        const currentItem = allItems[currentIndex];
        let delay = 3000;

        if (currentItem === video) {
            delay = 5000;
            video.play();
        }

        currentIndex = (currentIndex + 1) % allItems.length;
        setTimeout(() => {
            showItem(currentIndex);
            nextItem();
        }, delay);
    }

    showItem(0);
    nextItem();
}
