import { Swiper, EffectFade } from "swiper";
import Sticky from 'sticky-js';

Swiper.use([EffectFade]);

let windowWidth,
    items = $('.subscription__item');

let subscriptionSlider = new Swiper(".subscription__tel-slider", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    resistance: true,
    resistanceRatio: 0,
    watchOverflow: true,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    navigation: {
        nextEl: ".subscription .slider-arrow-next",
        prevEl: ".subscription .slider-arrow-prev",
      },
});    

const sticky = new Sticky('.sticky');

windowWidth = $(window).width();

$(window).on('resize', function() {
    windowWidth = $(window).width();

    if (windowWidth < 600) {
        items.addClass('hidden');
        $(items[0]).removeClass('hidden');
    } else {
        $(items).removeClass('hidden');
    }
});

$(window).on('scroll', function() {
    let scrollTop   = $(window).scrollTop(),
        sctickyTop  = $('.sticky').offset().top,
        item = $('.sticky');
        
        sticky.update();

        if (windowWidth > 600) { 
            items.each(function(i) {
                let itemScrollTop = $(this).offset().top - 250;
    
                if (sctickyTop >= itemScrollTop) {
                    subscriptionSlider.slideTo(i);
                }

                if (!item.hasClass('is-sticky') && scrollTop > $('.sticky-wrapper').offset().top) {
                    subscriptionSlider.slideTo(subscriptionSlider.slides.length - 1);
                }
            });
        }
});

if (windowWidth < 600) {
    items.addClass('hidden');
    $(items[0]).removeClass('hidden');
}

subscriptionSlider.on('slideChange', function() {
    if (windowWidth < 600) {
        items.addClass('hidden');
        $(items[this.activeIndex]).removeClass('hidden');
    }
});