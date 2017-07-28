$(function() {
    var skip = 9;

    $(window).scroll(function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            var categoryUrl = window.location.pathname.split('/')[2];
            var query = $.query.get();

            $.get('/api/products', {
                categoryUrl: categoryUrl,
                q: query.q,
                p: query.p,
                skip: skip,
            }, function(products) {
                $('.row.scroll').append(products)
                skip += skip;
            });
        }
    });
});
