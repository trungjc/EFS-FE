$(function () {
    var slider = document.getElementById('priceRange');
    noUiSlider.create(slider, {
        start: [0, 100],
        connect: true,
        step: 1,
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
    });
    slider.noUiSlider.on('update', function () {
    });
})