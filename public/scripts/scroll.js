$(function() {
    var skip = 10;

    $(window).scroll(function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            var url = $('form').attr('action').split('/')[2]

            $.get('/api/products', { categoryUrl: url, skip: skip.toString() }, function(products) {
                $('.row.scroll').append(products)
                skip += skip;
            })
        }
    });
});
