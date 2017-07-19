const utils = require('./../../../utils');

const init = (req, res, data) => {
    data
        .categories.getByUrl(req.params.category)
        .then((category) => {
            const categoryId = category._id;
            data
                .products
                .getByCategoryId(categoryId, req.body.searchText,
                    req.body.priceRange)
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
        .catch((msg) => utils.showErrorPage(msg, res));
};

module.exports = { init };