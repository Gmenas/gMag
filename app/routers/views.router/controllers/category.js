const priceConfig = {
    min: 0,
    max: 5000,
    step: 50,
};

function init(req, res, data) {
    return data
        .categories.getByUrl(req.params.categoryUrl)
        .then((category) => {
            const filter = {
                text: req.query.q,
                price: {
                    min: req.query.pmin || priceConfig.min,
                    max: req.query.pmax || priceConfig.max,
                },
                categoryId: category._id,
            };

            return data
                .products
                .getByQueryFilter(filter, 9)
                .then((products) => {
                    const context = {
                        title: `Browse ${category.title}`,
                        user: req.user,
                        flash: req.flash(),
                        category: category,
                        products: products,
                        filter: filter,
                        slider: priceConfig,
                    };
                    return res.render('category', context);
                });
        })
        .catch((msg) => res.renderError(msg));
}

module.exports = { init };
