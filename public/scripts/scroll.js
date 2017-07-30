$(function() {
    var filter = window.ctx.filter;
    var skip = currSkip = 9;

    $(window).on('scroll', function() {
        var windowHeight = $(window).outerHeight();
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(window).innerHeight();

        if ((windowHeight + scrollTop) === documentHeight) {
            filter.skip = currSkip;

            $.get('/api/products', filter, function(products) {
                $('.row.scroll').append(products);
                currSkip += skip;
            });
        }
    });
});
