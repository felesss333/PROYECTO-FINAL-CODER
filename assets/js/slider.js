$(document).ready(function () {
    const slideImgs = [
      "assets/img/slide1.jpg",
      "assets/img/slide2.jpg",
      "assets/img/slide3.jpg",
      "assets/img/slide4.jpg",
      "assets/img/slide5.jpg"
    ];

    const slider = $('.slider');

    for (let i = 0; i < slideImgs.length; i++) {
        const slide = $('<div>').addClass('slide');
        const sliderContainer = $('<div>').addClass('slider-container');
        const brandTagline = $('<div>').addClass('slogan');
        const brandItemPic = $('<div>').addClass('brand-item-pic').css('background-image', 'url(' + slideImgs[i] + ')');
        const tagline = $('<div>').addClass('tagline');
        const tagline1 = $('<h1>').addClass('slogan1').text('Be Pround,');
        const tagline2 = $('<h1>').addClass('slogan2').text('Become a Pro Player.');

        tagline.append(tagline1, tagline2);
        brandItemPic.append(tagline);
        brandTagline.append(brandItemPic);
        sliderContainer.append(brandTagline);
        slide.append(sliderContainer);
        slider.append(slide);
    }

    // FUNCIONALIDAD PARA EL PREV Y EL NEXT
    $('.slider-arrow-prev').on('click', function () {
        $('.slider').slick('slickPrev');
    });

    $('.slider-arrow-next').on('click', function () {
        $('.slider').slick('slickNext');
    });

    // INICIALIZANDO SLIDER CON SLICK
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});