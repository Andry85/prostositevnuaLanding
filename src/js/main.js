(function($){

    // faq accardion
    $('.question__head').click(function () {
        $(this).toggleClass('active');
        $(this).next('.question__body').slideToggle('slow');
    });

    // Adaptive menu
    $(function(){
        $('.menu').slicknav({
            label: '',
            duration: 1000
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
            top = $(id).offset().top-100;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

    // getting blocks
    $(".main > div").each(function(){
        var off = $(this).offset().top-105;
        $(this).attr("data-top", off);
    });

    // Scrolling page
    $(window).scroll(function() {
        var scrollTopWindows = $(this).scrollTop();
        $(".main > div").each(function(){
            if ( scrollTopWindows >= $(this).attr("data-top") ) {
                var current = $(this).attr('id');
                $(".menu li a").each(function(){
                    if ($(this).attr('href') == ('#' + current)) {
                        $(this).parent().addClass('current');
                        $(this).parent().siblings().removeClass('current');
                    }
                });
            }
        });
    });

})(jQuery);