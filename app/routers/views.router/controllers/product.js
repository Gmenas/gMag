function init(req, res, data) {
    return data
        .products.getById(req.params.id)
        .then((product) => {
            data.
                users.getById(product.sellerId)
                .then((user) => {
                    product.seller = user;

                    const context = {
                        title: `Details for ${product.title}`,
                        user: req.user,
                        flash: req.flash(),
                        product: product,
                    };
                    return res.render('product', context);
                });
        })
        .catch((msg) => res.renderError(msg));
}

module.exports = { init };
