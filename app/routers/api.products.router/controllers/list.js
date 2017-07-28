function init(req, res, data) {
    const filter = data.products.makeValidFilter({
        textStr: req.query.q,
        priceArr: req.query.p,
    });

    const skip = Number(req.query.skip);
    const count = 9;

    data
        .categories.getByUrl(req.query.categoryUrl)
        .then((category) => {
            const categoryId = category._id;
            data
                .products
                .getByQueryFilter(categoryId, filter, skip, count)
                .then((products) => {
                    const context = {
                        products: products,
                    };

                    return res.render('partial/scroll', context);
                });
        })
        .catch((msg) => res.renderError(msg));
}

module.exports = { init };
