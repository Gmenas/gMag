$(function() {
    var skip = currSkip = 9;

    $(window).on('scroll', function() {
        var windowHeight = $(window).outerHeight();
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(window).innerHeight();

        if ((windowHeight + scrollTop) === documentHeight) {
            var categoryUrl = window.location.pathname.split('/')[2];
            var query = $.query.get();

            $.get('/api/products', {
                categoryUrl: categoryUrl,
                q: query.q,
                p: query.p,
                skip: currSkip,
            }, function(products) {
                $('.row.scroll').append(products);
                currSkip += skip;
            });
        }
    });
});
