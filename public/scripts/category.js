$(function() {
    var filter = window.ctx.filter;
    var skipStep = 9;
    var skip = skipStep;

    $(window).on('scroll', function() {
        var windowHeight = $(window).outerHeight();
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(window).innerHeight();

        if ((windowHeight + scrollTop) === documentHeight) {
            filter.skip = skip;

            $.get('/api/products', filter, function(products) {
                $('.row.scroll').append(products);
                skip += skipStep;
            });
        }
    });
});
