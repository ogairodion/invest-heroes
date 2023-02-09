import { Swiper, Lazy, Scrollbar } from "swiper";

Swiper.use([Lazy, Scrollbar]);

let teamSlider = new Swiper(".team__slider", {
    slidesPerView: "auto",
    spaceBetween: 84,
    scrollbar: {
      el: ".team__slider .swiper-scrollbar",
    },
    lazy: true,
    watchOverflow: false,
    observer: true,
    observeParents: true,
    resistance: true,
    resistanceRatio: 0,
});