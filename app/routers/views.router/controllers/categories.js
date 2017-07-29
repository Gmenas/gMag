function init(req, res, data) {
    const categoriesWithProducts = [];

    return data
        .categories.getAll()
        .then((categories) => {
            const filter = {
                text: req.query.q,
            };

            categories.forEach((c) => {
                filter.categoryId = c._id;
                c.products = data.products.getByQueryFilter(filter, 3);
                categoriesWithProducts.push(c);
            });
            return Promise
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
