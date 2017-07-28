function init(req, res, data, asd) {
  const filter = data.products.makeValidFilter({
    textStr: '.*',
    priceArr: [],
  });

  const url = req.query.categoryUrl;
  const skip = Number(req.query.skip);
  const count = 9;

  data
    .categories.getByUrl(url)
    .then((category) => {
      const categoryId = category._id;
      data
        .products
        .getByQueryFilter(categoryId, filter, skip, count)
        .then((products) => {
          const context = {
            products: products,
          };

          return res.render('scroll', context);
        });
    })
    .catch((msg) => res.renderError(msg));
}
module.exports = { init };
