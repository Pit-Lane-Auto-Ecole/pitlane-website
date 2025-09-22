document.addEventListener("DOMContentLoaded", function () {
    const priceCarousel = new Swiper(".price-carousel", {
        centeredSlides: false,
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".price-carousel .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            400: {
                slidesPerView: 1,
            },
        },
    });

    const courseCarousel = new Swiper(".course-carousel", {
        centeredSlides: false,
        paginationClickable: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        autoHeight: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".course-carousel .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            400: {
                slidesPerView: 1,
            },
        },
    });

    const statsCarousel = new Swiper(".stats-carousel", {
        centeredSlides: false,
        paginationClickable: true,
        loop: true,
        slidesPerView: 1,
        autoHeight: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".stats-carousel .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1920: {
                slidesPerView: 6,
            },
            1536: {
                slidesPerView: 5,
            },
            1024: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 2,
            },
        },
    });

    const mainCarousel = new Swiper(".main-carousel", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: ".main-carousel .swiper-button-next",
            prevEl: ".main-carousel .swiper-button-prev",
        },
        pagination: {
            el: ".main-carousel .swiper-pagination",
            clickable: true,
        },
    });
});
