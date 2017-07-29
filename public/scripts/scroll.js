$(function() {
    var skip = currSkip = 9;

    $(window).on('scroll', function() {
        var windowHeight = $(window).outerHeight();
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(window).innerHeight();

        if ((windowHeight + scrollTop) === documentHeight) {
            var filter = window.filter;
            filter.skip = currSkip;

            $.get('/api/products', filter, function(products) {
                $('.row.scroll').append(products);
                currSkip += skip;
            });
        }
    });
});
