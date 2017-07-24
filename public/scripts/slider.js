$(function() {
    var timeOut;
    $('#price-range').on('change', function(el) {
        clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            var val = el.value.newValue;
            var q = $.query.set('p', val).toString();
            location.search = q;
        }, 700);
    });
});
