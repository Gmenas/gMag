$(function () {
  var skip = 9;

  $(window).on('scroll', function () {
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
        skip: skip,
      }, function (products) {
        $('.row.scroll').append(products);
        // skip += skip;-taka nqma da zaredi ako ima ostavashti kolkoto i da sa po malko ot 9 obqvi naprimer ima oshte 3 a skipvame 9
        skip = $('.text-muted').length;// wzimam kolkoto ima do momenta tolkova da skipne moje da sa samo 3 a ne 9 naprimer :)
      });
    }
  });
});
