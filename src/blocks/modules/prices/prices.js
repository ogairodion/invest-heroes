import $ from 'jquery';
import { Swiper } from "swiper";

let tab     = $('.prices__tab'),
    sliders = $('.prices__sliders-table');

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

$('.prices__slide').each(function() {
    const priceBlock = $('.prices__slide-price', $(this));  
    let price = $('.prices').hasClass('kz') ? $(this).data('price-kz') : $(this).data('price-ru'),
        priceStr,
        diff = 473,
        priceUS;

    if (price) {
        priceStr = price.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
    }

    if ($('.prices').hasClass('kz')) {
        let diffStr,
            remainder;

        priceUS = (price / diff).toFixed();
        diffStr = priceUS.toString().slice(-1);

        remainder = 5 - diffStr;

        priceBlock.html(`<span>${priceStr}</span> ₸`);
        $('.prices__slide-price--us', $(this)).html(`~ <span>${parseInt(priceUS) + remainder}</span> $`);
    } else {
        priceBlock.html(`<span>${priceStr}</span> ₽`);
    }
});

$('.prices__slider').each(function(i) {
    $(this).addClass('prices__slider-' + i);

    let statisticsSlider = new Swiper(".prices__slider-" + i, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        observer: true,
        observeParents: true,
        resistance: true,
        resistanceRatio: 0,
        centeredSlides: true,
        breakpoints: {
            600: {
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: false,
            }
        }
    });    

    const wrapper = $(this).closest('.prices__sliders');
    const sliderTabs = $('.prices__sliders-nav--item', $(wrapper));

    $(sliderTabs[0]).addClass('active');

    statisticsSlider.on('slideChange', function() {
        $(sliderTabs).removeClass('active');
        $(sliderTabs[statisticsSlider.activeIndex]).addClass('active');
    });

    $(sliderTabs).on('click', function() {
        const text = $(this).text();
        $(sliderTabs).removeClass('active');
        $(this).addClass('active');

        $(sliderTabs).each(function(i) {
            if (text == $(this).text()) {
                statisticsSlider.slideTo(i);
            }
        });
    });
});

$('.prices__checkbox').on('change', function() {
    let parent          =   $(this).closest('.prices__sliders-table'),
        category        =   parent.data('category'),
        slide           =   $(this).closest('.prices__slide'),
        slideID         =   slide.attr('id'),
        btn             =   $('.prices__slide-btn', slide),
        checkboxes      =   $('input[type="checkbox"]', slide),
        prices          =   $('.prices__slide-price span', slide),
        priceUS         =   $('.prices__slide-price--us span', $(slide)),
        currentPrice    =   0,
        currentPriceUS  =   0,
        currentPriceUSSum  =   0,
        checked         =   $(this).is(':checked'),
        diffStr,
        remainder,
        diff            =   473;

        if (checked) {
            let priceDiff = $('.prices').hasClass('kz') ? parseInt($(this).data('price-kz')) : parseInt($(this).data('price-ru'));
            currentPrice = parseInt(prices.text().replace(/\D+/g,"")) + priceDiff;
            
            prices.text(currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

            currentPriceUS = (priceDiff / diff).toFixed();
            diffStr = currentPriceUS.toString().slice(-1);
            remainder = 5 - diffStr;
            currentPriceUSSum = parseInt(currentPriceUS) + remainder;

            priceUS.text(parseInt(priceUS.text()) + currentPriceUSSum);

            currentPriceUSSum = 0;
        } else {
            let priceDiff = $('.prices').hasClass('kz') ? parseInt($(this).data('price-kz')) : parseInt($(this).data('price-ru'));
            currentPrice = parseInt(prices.text().replace(/\D+/g,"")) - priceDiff;

            prices.text(currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

            currentPriceUS = (priceDiff / diff).toFixed();
            diffStr = currentPriceUS.toString().slice(-1);
            remainder = 5 - diffStr;
            currentPriceUSSum = parseInt(currentPriceUS) + remainder;

            priceUS.text(parseInt(priceUS.text()) - currentPriceUSSum);

            currentPriceUSSum = 0;
        }

        getInfo(category, slideID, btn, checkboxes, prices);
});

function getInfo(category, slideID, btn, checkboxes, prices) {
    let link,
        isCheckedAll = false,
        checkboxID = 0,
        checked = [];

        checkboxes.each(function(i) {
            if ($(this).is(':checked')) {
                checkboxID = i + 1;
                checked.push($(this));
            }

            if (checked.length == checkboxes.length) {
                isCheckedAll = true;
            } else {
                isCheckedAll = false;
            }
        });

    switch(true) {
        case category == 'ru' && slideID == 'standart'  && !isCheckedAll && checkboxID == 1:
            link = '/order?content=2&rate=15';
        break;
        case category == 'ru' && slideID == 'standart'  && !isCheckedAll && checkboxID == 2:
            link = '/order?content=2&rate=16';
        break;
        case category == 'ru' && slideID == 'standart' && !isCheckedAll && checkboxID == 0:
            link = '/order?content=2&rate=11';
        break;
        case category == 'ru' && slideID == 'standart' && isCheckedAll:
            link = '/order?content=2&rate=12';
        break;
        case category == 'ru' && slideID == 'invest'  && !isCheckedAll && checkboxID == 1:
            link = '/order?content=2&rate=17';
        break;
        case category == 'ru' && slideID == 'invest'  && !isCheckedAll && checkboxID == 2:
            link = '/order?content=2&rate=18';
        break;
        case category == 'ru' && slideID == 'invest' && !isCheckedAll && checkboxID == 0:
            link = '/order?content=2&rate=13';
        break;
        case category == 'ru' && slideID == 'invest' && isCheckedAll:
            link = '/order?content=2&rate=14';
        break;
        case category == 'us' && slideID == 'standart' && !isCheckedAll && checkboxID == 1:
            link = '/order?content=44&rate=71';
        break;
        case category == 'us' && slideID == 'standart' && !isCheckedAll && checkboxID == 2:
            link = '/order?content=44&rate=72';
        break;
        case category == 'us' && slideID == 'standart' && !isCheckedAll && checkboxID == 0:
            link = '/order?content=44&rate=68';
        break;
        case category == 'us' && slideID == 'standart' && isCheckedAll:
            link = '/order?content=44&rate=63';
        break;
        case category == 'us' && slideID == 'invest' && !isCheckedAll && checkboxID == 1:
            link = '/order?content=44&rate=69';
        break;
        case category == 'us' && slideID == 'invest' && !isCheckedAll && checkboxID == 2:
            link = '/order?content=44&rate=70';
        break;
        case category == 'us' && slideID == 'standart' && !isCheckedAll && checkboxID == 0:
            link = '/order?content=44&rate=65';
        break;
        case category == 'us' && slideID == 'invest' && isCheckedAll:
            link = '/order?content=44&rate=60';
        break;
        case category == 'all' && slideID == 'standart'  && !isCheckedAll && checkboxID == 1:
            link = '/order?content=2&rate=76';
        break;
        case category == 'all' && slideID == 'standart'  && !isCheckedAll && checkboxID == 2:
            link = '/order?content=2&rate=77';
        break;
        case category == 'all' && slideID == 'standart'  && !isCheckedAll && checkboxID == 0:
            link = '/order?content=2&rate=78';
        break;
        case category == 'all' && slideID == 'standart' && isCheckedAll:
            link = '/order?content=2&rate=67';
        break;
        case category == 'all' && slideID == 'invest'  && !isCheckedAll && checkboxID == 1:
            link = '/order?content=2&rate=73';
        break;
        case category == 'all' && slideID == 'invest'  && !isCheckedAll && checkboxID == 2:
            link = '/order?content=2&rate=74';
        break;
        case category == 'all' && slideID == 'invest'  && !isCheckedAll && checkboxID == 0:
            link = '/order?content=2&rate=75';
        break;
        case category == 'all' && slideID == 'invest' && isCheckedAll:
            link = '/order?content=2&rate=64';
        break;
    }

    btn.attr('href', link);
}

$(document).on('mouseup', function(e){
    const row = $(e.target).closest('.prices__left-row');
    if (!$(e.target).hasClass('prices__left-msg')) {
        if ($(e.target).hasClass('prices__left-img')) {
            $('.prices__left-row').removeClass('active');
            $(row).addClass('active');
        } else {
            $('.prices__left-row').removeClass('active');
        }
    }
});