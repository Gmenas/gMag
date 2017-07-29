function init(req, res, data) {
    if (!req.user) {
        return res.renderError(
            'You must be logged in to add a product.'
        );
    }

    return require('./image.uploader').init(data)(req, res, (err) => {
        const photo = req.file;
        const product = {
            title: req.body.title,
            description: req.body.description,
            price: Number(Number(req.body.price).toFixed(2)),
            categoryUrl: req.body.categoryUrl,
            sellerId: req.user._id,
            photoId: photo ? photo.grid._id : null,
        };

        return new Promise((resolve, reject) => {
            return err ? reject(err.message) : resolve();
        })
            .then(() => data.categories.getByUrl(product.categoryUrl))
            .then((category) => {
                product.categoryId = category._id;
                return Promise.resolve(data.products.create(product));
            })
            .then((p) => {
                return res.redirect(`/product/${p._id}`);
            })
            .catch((errors) => {
                req.flash('error', errors);
                return res.redirect('/sell');
            });
    });
}

module.exports = { init };
