(function($){

    // faq accardion
    $('.faqList__title').click(function () {
        $(this).next('.faqList__body').slideToggle('slow');
        $(this).parent().toggleClass('faqList__active');
    });

    // Adaptive menu
    $(function(){
        $('.menu').slicknav({
            label: '',
            duration: 1000,
            closeOnClick: true
        });
    });


    // Scrolling menu
    $(".menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        $(this).parent().addClass('current');
        $(this).parent().siblings().removeClass('current');
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top-142;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });


    $('.worksSlider.owl-carousel').owlCarousel({
        loop:true,
        margin: 28,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 3,
                loop:false
            }
        }
    });

    $('.testimonialsSlider.owl-carousel').owlCarousel({
        loop:true,
        margin: 28,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 3,
                loop:false
            }
        }
    });

})(jQuery);