import $ from 'jquery';
// import ProgressBar from "progressbar.js/dist/progressbar"
// eslint-disable-next-line no-unused-vars
// import Circle from "progressbar.js/src/circle"
// import { Swiper } from "swiper";
// import Chart from 'chart.js'

let tab     = $('.statistics__tab'),
    sliders = $('.statistics__items');

// $('.statistics__items').each(function(i) {
//     $(this).addClass('statistics-slider-' + i);

//     let statisticsSlider = new Swiper(".statistics-slider-" + i, {
//         slidesPerView: "auto",
//         spaceBetween: 20,
//         observer: true,
//         observeParents: true,
//         resistance: true,
//         resistanceRatio: 0,
//         breakpoints: {
//             600: {
//                 spaceBetween: 40,
//             }
//         }
//     });    
// });

// $('.progress-bar--circular').each(function(i) {
//     $(this).addClass('progress-bar--circular-' + i);
//     let progressBar = $(this).closest('.progressbar');
//     let barPercent = parseInt($(progressBar).data('percent')) / 100;

//     let bar = new ProgressBar.Circle('.progress-bar--circular-' + i, {
//         strokeWidth: 8,
//         easing: 'easeInOut',
//         duration: 1400,
//         color: '#333E63',
//         trailColor: '#F5F5F5',
//         trailWidth: 1,
//         svgStyle: null,
//     });
    
//     bar.animate(barPercent);  // Number from 0.0 to 1.0
// });

tab.on('click', function() {
    let item        = $(this),
        activeAttr  = $(this).data('category');

    tab.removeClass('active');
    item.addClass('active');

    sliders.each(function() {   
        let category = $(this).data('category');

        if (activeAttr == category) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
});