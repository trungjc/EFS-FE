//css for home page 

function homePage() {
    var setCount = 0;
    var lastScroll = 0;
    var elementHeight = $('.oto-bg').height()
    var pecent = 100
    $(window).on('resize scroll', function () {
        //Code here
        var $target = $('.explore-section .see-more')

        var elementTop = $target.offset().top;
        var elementBottom = elementTop + $target.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            if (viewportTop > lastScroll) {
                pecent--
            }
            else {
                pecent++
            }
            $('.oto-bg').css('background-position', '0 ' + pecent + '%')
            lastScroll = viewportTop
        }
    });

    //slick
    $('.constant-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    //init slick 3d
    var showcase = $("#carousel")
    showcase.Cloud9Carousel({
        yOrigin: 42,
        yRadius: 48,
        mirror: {
            gap: 12,
            height: 0.2
        },
        buttonLeft: $("#buttons > .left"),
        buttonRight: $("#buttons > .right"),
        autoPlay: 0,
        bringToFront: true,
        onRendered: rendered
    })
    function rendered(carousel) {
        $('.slide-3d .product-info').removeClass('active');
        $('.slide-3d .thumbnail-news > li').removeClass('active');
        var index = carousel.nearestIndex() + 1;
        $('.slide-3d .thumbnail-news > li:nth-child(' + index + ')').addClass('active');
        $(carousel.nearestItem().element).next().addClass('active');
    }
    $('#buttons > button').click(function (e) {
        var b = $(e.target).addClass('down')
        setTimeout(function () { b.removeClass('down') }, 80)
    })
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                $('#buttons > .left').click()
                break
            case 39:
                $('#buttons > .right').click()
        }
    })
    //init video modal
    $('.play-vid').on('click', function () {
        let vidSrc = $(this).attr('data-video')
        $('#videoBody').html('<iframe width="560" height="315" src="' + vidSrc + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        $('#modalVideo').modal('show')
        $('#modalVideo').on('hide.bs.modal', function () {
            $('#videoBody').html('')
        })
    })
    //scroll

    //smooth scroll to top
    $('.next-page').on('click', function (event) {
        //caculator next section
        let offsetTop = $(this).parents('section').next().offset().top,
            scroll_top_duration = 700;
        event.preventDefault();
        $('body,html').animate({
            scrollTop: offsetTop,
        }, scroll_top_duration
        );
    });
    //autocomplete
    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    };
    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'states',
        source: substringMatcher(states)
    });
}
$(function () {
    //check mobile
    let winWidth = window.innerWidth
    if (winWidth < 1024) {
        //add class menu
        $('#mobile_menu').addClass('collapse');
        $('#search_group').addClass('collapse');
    }
    if ($('.cms-home-page').length > 0) {
        homePage()
    }
})