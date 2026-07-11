// Profile Carousel Functionality
const profileCarousel = document.querySelector('.profile-carousel');

if (profileCarousel) {
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

    rotateProfileImages();
    setInterval(rotateProfileImages, 3000);
}
