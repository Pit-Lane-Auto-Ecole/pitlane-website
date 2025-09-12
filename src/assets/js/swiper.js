document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".centered-slide-carousel", {
        centeredSlides: false,
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".centered-slide-carousel .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            400: {
                slidesPerView: 1
            }
        }
    });
});