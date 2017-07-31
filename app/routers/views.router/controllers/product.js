function init(req, res, data) {
    return data
        .products.getById(req.params.id)
        .then((product) => {
            if (!product) {
                return Promise.reject('Product not found.');
            }

            return data.
                users.getById(product.sellerId)
                .then((user) => {
                    product.seller = user;
                    let isViewers = false;
                    if (req.user) {
                        isViewers = product.seller._id
                            .equals(req.user._id);
                    }

                    let isFavByViewer = false;
                    if (req.user) {
                        isFavByViewer = data.products
                            .favouritedBy(product, req.user._id);
                    }

                    const context = {
                        title: `Details for ${product.title}`,
                        user: req.user,
                        flash: req.flash(),
                        product: product,
                        isViewers: isViewers,
                        isFavouritedByViewer: isFavByViewer,
                        windowCtx: {
                            product: {
                                _id: product._id,
                                sellerId: product.seller._id,
                            },
                        },
                    };
                    return res.render('product', context);
                });
        })
        .catch((msg) => res.renderError(msg));
}

module.exports = { init };
