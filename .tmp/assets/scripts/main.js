'use strict';

var isMobileScreen = function isMobileScreen() {
  return document.body.clientWidth < 992;
};

var app = {
  init: function init() {
    app.sliderHero();
    app.initEqualHeight();
    app.slickMobile();
    app.menu();
  },

  sliderHero: function sliderHero() {

    $('.slider').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      dots: true,
      arrows: false
    });
  },
  slickMobile: function slickMobile() {
    var slick = $('.slick-mobile');
    slick.slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      dots: false,
      arrows: true
    });
  },
  initEqualHeight: function initEqualHeight() {
    if (isMobileScreen()) return;
  },
  menu: function menu() {

    $('#navbarSupportedContent').on('shown.bs.collapse', function () {
      $('html').addClass('show-menu');
    });
    $('#navbarSupportedContent').on('hidden.bs.collapse', function () {
      $('html').removeClass('show-menu');
    });
    if (!isMobileScreen()) return;
    $('.navbar-nav .caret').on('click', function () {

      var subMenu = $(this).next();

      if ($(this).closest('.level-1').hasClass('active')) {
        if ($(this).hasClass('open-submenu')) {
          $(this).removeClass('open-submenu');
          $(this).parent().removeClass('active');
          subMenu.removeClass('active');
          return;
        } else {
          console.log('teo biet');
          $(this).closest('.level-2').find('li.active').removeClass('active');
          $(this).closest('.level-2').find('.open-submenu').removeClass('open-submenu');
          $(this).closest('.level-2').find('.level-3').removeClass('active');
        }
      } else {
        if ($(this).hasClass('open-submenu')) {
          $(this).removeClass('open-submenu');
          $(this).parent().removeClass('active');
          subMenu.removeClass('active');
          return;
        } else {
          $('.navbar-nav .has-child').removeClass('active');
          $('.navbar-nav .caret').removeClass('open-submenu');
          $('.navbar-nav .sub-menu').removeClass('active');
        }
      }
      $(this).addClass('open-submenu');
      $(this).parent().addClass('active');
      subMenu.addClass('active');
      // $(this).toggleClass('open-submenu');
      // $(this).parent().toggleClass('active');
      // subMenu.toggleClass('active');
    });
  },
  equalHeightByRow: function equalHeightByRow(obj, notRunMobile) {
    var widthTarget = 0;
    if ($(obj).length) {
      $(obj).height('auto');
      widthTarget = notRunMobile === true ? 768 : 0;
      if ($(window).width() >= widthTarget) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = [],
            currentDiv = 0,
            $el,
            topPosition = 0;
        $(obj).each(function () {
          if ($(this).is(':visible') === true) {
            $el = $(this);
            topPosition = $el.offset().top;
            if (currentRowStart !== topPosition) {
              for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].css('min-height', currentTallest);
              }
              rowDivs = [];
              currentRowStart = topPosition;
              currentTallest = $el.innerHeight();
              rowDivs.push($el);
            } else {
              rowDivs.push($el);
              currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
            }
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
              rowDivs[currentDiv].css('min-height', currentTallest);
            }
          }
        });
      }
    }
  }

};

$(document).ready(function () {

  // $('body').scrollspy({ target: '.affix-top' })
  app.init();
  var resizeId;
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(function () {
      app.initEqualHeight();
      app.menu();
    });
  });

  $(window).scroll(function () {});
});

$(window).on('load', function () {
  app.initEqualHeight();
});
//# sourceMappingURL=main.js.map
