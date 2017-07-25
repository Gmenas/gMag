function init(req, res, data) {
    const filter = data.products.makeValidFilter({
        textStr: req.query.q,
        priceArr: req.query.p,
    });
    const categoriesWithProducts = [];

    data
        .categories.getAll()
        .then((categories) => {
            categories.forEach((c) => {
                c.products = data.products
                    .getByQueryFilter(c._id, filter, 3);
                categoriesWithProducts.push(c);
            });
            Promise
                .all(categories.map((x) => x.products))
                .then((groupedProducts) => {
                    groupedProducts.forEach((x, i) => {
                        categoriesWithProducts[i].products = x;
                    });
                    const context = {
                        title: 'Categories',
                        user: req.user,
                        flash: req.flash(),
                        categories: categoriesWithProducts,
                    };
                    return res.render('categories', context);
                });
        });
}

module.exports = { init };
