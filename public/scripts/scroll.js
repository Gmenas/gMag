let skip = 9;
$(window).scroll(function () {

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

    const url = $('form').attr('action').split('/')[2]

    $.get('products', { skip: skip.toString(), categoryUrl: url }, function (products) {
      $('.row.scroll').append(products)
      skip = $('.text-muted').length;
    })
  }
});
