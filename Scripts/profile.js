// Profile image display
const profileCarousel = document.querySelector('.profile-carousel');

if (profileCarousel) {
    const profileImage = profileCarousel.querySelector('.profile-img');
    if (profileImage) {
        profileCarousel.setAttribute('aria-label', profileImage.alt);
    }
}
