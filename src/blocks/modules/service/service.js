import { Swiper, Navigation, Pagination, Lazy} from 'swiper';

Swiper.use([Navigation, Pagination, Lazy]);

let serviceSlider = new Swiper(".service__slider", {
    slidesPerView: 1,
    pagination: {
      el: ".service .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".service__slider .slider-arrow-next",
      prevEl: ".service__slider .slider-arrow-prev",
    },
    lazy: true,
});