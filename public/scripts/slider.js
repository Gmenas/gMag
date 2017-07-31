$(function() {
    var isEmptyQuery = $.isEmptyObject($.query.keys);
    var $clearFilter = $('#clear-filter');

    if (!isEmptyQuery) {
        $clearFilter.removeClass('hidden');
    }

    $clearFilter.on('click', function(e) {
        e.preventDefault();
        window.location = location.pathname;
    });

    var timeOut;
    $('#price-range').on('change', function(el) {
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            var val = el.value.newValue;
            var query = $.query
                .set('pmin', val[0])
                .set('pmax', val[1])
                .toString();
            location.search = query;
        }, 700);
    });
});
