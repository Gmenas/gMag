const init = (req, res, data) => {
    const filterSearch = {
        searchText: req.body.searchText,
    };
    const categoriesWithProducts = [];
    data
        .categories.getAll()
        .then((categories) => {
            categories.forEach((c) => {
                c.products = data.products
                    .getByCategoryId(c._id, filterSearch, 3);
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
                    return res.render('browse-categories', context);
                });
        });
};

module.exports = { init };
