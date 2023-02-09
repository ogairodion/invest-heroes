import { Swiper, Navigation, Lazy, Thumbs } from 'swiper';

Swiper.use([Navigation, Lazy, Thumbs]);

let btn         = $('.about__btn'),
    parent      = $('.about__slider-main'),
    items       = $('.about__slide', parent),
    windowWidth;

windowWidth = $(window).width();
adaptiveReviews(windowWidth); 

$(window).on('resize', function() {
    windowWidth = $(window).width();
    adaptiveReviews(windowWidth); 
});

let aboutSliderMain = new Swiper(".about__slider-main", {
    slidesPerView: 'auto',
    spaceBetween: 27,
    lazy: true,
    watchOverflow: false,
    navigation: {
        nextEl: ".about__sliders .slider-arrow-next",
        prevEl: ".about__sliders .slider-arrow-prev",
    },
    breakpoints: {
        1199: {
            direction: "vertical",
            resistance: false,
            loop: true,
        }
    },
    allowTouchMove: false,
    observer: true,
    observeParents: true,
});

let aboutSliderReviews = new Swiper(".about__reviews", {
    slidesPerView: 1,
    spaceBetween: 35,
    thumbs: {
        swiper: aboutSliderMain,
    },
    navigation: {
        nextEl: ".about__sliders .slider-arrow-next",
        prevEl: ".about__sliders .slider-arrow-prev",
    },
    loop: true,
    allowTouchMove: false,
});

function adaptiveReviews(widthWindow) {
    if (widthWindow > 1199) {
        $('.about__slide').removeClass('hidden');

        if (aboutSliderMain) {
            aboutSliderMain.update();
        }
    } else {
        initLoadMore('3', '3');
    }
}

function initLoadMore(count, visiblecount){
    var loadMoreBlocks = items;
    if (loadMoreBlocks.length / visiblecount > 2) {    
        for (var i = loadMoreBlocks.length - 1; i >= visiblecount; i--) {
            $(loadMoreBlocks[i]).addClass('hidden').fadeOut(0);
        }
        $(btn).removeClass('hidden');
    }
    $(btn).on('click', function(e) {
        loadMoreBlocks = $('.about__slide.hidden');
        if (loadMoreBlocks.length / count > 1 && loadMoreBlocks.length / count > count - 1) {        
            for (var j = 0; j < count; j++) {
                $(loadMoreBlocks[j]).removeClass('hidden').fadeIn();                    
            }            
        } else {
            for (var j = loadMoreBlocks.length - 1; j >= 0; j--) {
                $(loadMoreBlocks[j]).removeClass('hidden').fadeIn();                    
            }
            $(this).addClass('hidden');
        }
    });
}