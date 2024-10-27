(function ($) {
    "use strict";

    jQuery(document).on('ready', function () {

        // Header Sticky
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 120) {

                $('.navbar-area-three').addClass("is-sticky-three");
                $('.navbar-area').addClass("is-sticky");
            } else {
                $('.navbar-area-three').removeClass("is-sticky-three");
                $('.navbar-area').removeClass("is-sticky");
            }
        });

        // Mean Menu
        jQuery('.mean-menu').meanmenu({
            meanScreenWidth: "991"
        });

    });

    // Logo Slider
    $('.logo-area').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 20,
        nav: false,
        responsive: {
            0: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    });
    // Testimonial Slider
    $('.testimonials-slider-area').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 0,
        nav: true,
        navText: [

            "<i class='flaticon-left'></i>",
            "<i class='flaticon-right'></i>"

        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 2,
            }
        }
    });
    // Testimonial5 Slider
    $('.test5-wrappers').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        nav: true,
        navText: [

            "<i class='flaticon-left'></i>",
            "<i class='flaticon-right'></i>"

        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1000: {
                items: 2,
            }
        }
    });
   
     // Banner Bottom Slider
     $('.banner_bottom_slider').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 10,
        nav: true,
        navText: [

            "<i class='flaticon-left'></i>",
            "<i class='flaticon-right'></i>"

        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 3,
            }
        }
    });
    // Recent-work
    $('.recent-wrapper').owlCarousel({
        loop: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 0,
        nav: true,
        navText: [

            "<i class='flaticon-left'></i>",
            "<i class='flaticon-right'></i>"

        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    });


    // Product-Slider
    $('.shop-slider').owlCarousel({
        loop: false,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 0,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1200: {
                items: 1,
            }
        }
    });

    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }

    $('.video_btn').magnificPopup({
        disableOn: 50,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
    
        fixedContentPos: false
    });



    // Mesonary isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: 1
        }
    })

    // filter items on button click
    $('.works-button').on('click', 'button', function () {
        $('.works-button button.active').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });


    // Go to Top
    $(function () {
        // Scroll Event
        $(window).on('scroll', function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 350) $('.go-top').addClass('active');
            if (scrolled < 350) $('.go-top').removeClass('active');
        });
        // Click Event
        $('.go-top').on('click', function () {
            $("html, body").animate({
                scrollTop: "0"
            }, 500);
        });
    });

    // preloder
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });

}(jQuery));



jQuery(function ($) {
    "use strict";

    function clients_review_slider() {
        $('.clients-review-slides').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            nav: true,
            items: 1,
            mouseDrag: true,
            touchDrag: true,
            navText: ["<i class='fa fa-long-arrow-alt-left'></i>", "<i class='fa fa-long-arrow-alt-right'></i>"],
            autoplay: false,
            smartSpeed: 1000,
            autoplayTimeout: 5000,
        })
    };
    clients_review_slider();
    // wow js
    $(function () {
        new WOW().init();
    });



    function onHoverthreeDmovement() {
	    var tiltBlock = $('.js-tilt');
	    if(tiltBlock.length) {
	        $('.js-tilt').tilt({
	            maxTilt: 20,
	            perspective:700, 
	            glare: true,
	            maxGlare: 0
	        })
	    }
	}
    jQuery(document).on('ready', function () {
        (function ($) {
            // add your functions
            onHoverthreeDmovement();
        })(jQuery);
    });

    //countdown one

  $('#clock').countdown('2022/01/30', function (event) {
    $(this).html(event.strftime('' +
      '<div class="row">' +
      '<div class="col">' +
      '<h2 class="mb-1">%-D</h2>' +
      '<h5>Day%!d</h5>' +
      '</div>' +
      '<div class="col">' +
      '<h2 class="mb-1">%H</h2>' +
      '<h5>Hours</h5>' +
      '</div>' +
      '<div class="col">' +
      '<h2 class="mb-1">%M</h2>' +
      '<h5>Minutes</h5>' +
      '</div>' +
      '<div class="col">' +
      '<h2 class="mb-1">%S</h2>' +
      '<h5>Seconds</h5>' +
      '</div>' +
      '</div>'));
  });
}(jQuery));


