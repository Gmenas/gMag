$(function() {
    var skipStep = 9;
    var products = {
        filter: window.ctx.productFilter,
        skip: skipStep,
    };
    var favourites = {
        filter: window.ctx.favFilter,
        skip: skipStep,
    };
    var activeTab = window.location.hash || '#products'

    $('.nav-tabs a[href="'+activeTab+'"]').tab('show');

    $('.nav-tabs a').on('shown.bs.tab', function(event) {
        activeTab = $(event.target).attr('href');
        window.location.hash = activeTab;
    });

    $(window).on('scroll', function() {
        var windowHeight = $(window).outerHeight();
        var scrollTop = $(window).scrollTop();
        var documentHeight = $(window).innerHeight();

        if ((windowHeight + scrollTop) === documentHeight) {
            if (activeTab === '#products') {
                products.filter.skip = products.skip;

                $.get('/api/products', products.filter, function(p) {
                    $('.scroll-products').append(p);
                    products.skip += skipStep;
                });
            } else {
                favourites.filter.skip = favourites.skip;

                $.get('/api/products', favourites.filter, function(f) {
                    $('.scroll-favs').append(f);
                    favourites.skip += skipStep;
                });
            }
        }
    });
});
