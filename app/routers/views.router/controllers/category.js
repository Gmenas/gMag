function init(req, res, data) {
    const filter = data.products.makeValidFilter({
        textStr: req.query.q,
        priceArr: req.query.p,
    });

    const sliderConfig = {
        min: 0,
        max: 5000,
        step: 50,
    };

    data
        .categories.getByUrl(req.params.categoryUrl)
        .then((category) => {
            const categoryId = category._id;
            data
                .products
                .getByQueryFilter(categoryId, filter)
                .then((products) => {
                    const context = {
                        title: `Browse ${category.title}`,
                        user: req.user,
                        flash: req.flash(),
                        category: category,
                        products: products,
                        filter: filter,
                        slider: sliderConfig,
                    };

                    return res.render('category', context);
                });
        })
        .catch((msg) => res.renderError(msg));
}

module.exports = { init };
