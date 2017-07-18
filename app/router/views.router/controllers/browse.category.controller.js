const init = (req, res, data) => {
    data
        .categories.getByUrl(req.params.categoryUrl)
        .then((category) => {
            const categoryId = category._id;
            data
                .products
                .getByCategoryId(categoryId)
                .then((products) => {
                    const context = {
                        title: `Browse ${category.title}`,
                        user: req.user,
                        flash: req.flash(),
                        category: category,
                        products: products,
                    };

                    return res.render('browse-category', context);
                });
        })
        .catch((msg) => res.renderError(msg));
};

module.exports = { init };
