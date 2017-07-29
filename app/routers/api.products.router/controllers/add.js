const acceptedFiles = [
    'image/gif',
    'image/png',
    'image/jpeg',
    'image/bmp',
];

function init(req, res, data) {
    if (!req.user) {
        return res.renderError(
            'You must be logged in to add a product.'
        );
    }

    const product = {
        title: req.body.title,
        description: req.body.description,
        price: Number(Number(req.body.price).toFixed(2)),
        categoryUrl: req.body.categoryUrl,
        sellerId: req.user._id,
        fileId: req.file.grid._id || null,
    };

    return data
        .categories.getByUrl(product.categoryUrl)
        .then((category) => {
            product.categoryId = category._id;
            if (!req.file.mimetype.find(acceptedFiles)) {
                data.gfs.remove({ _id: product.fileId });
                return Promise.reject('Invalid image.');
            }

            return Promise.resolve(data.products.create(product));
        })
        .then((p) => {
            return res.redirect(`/product/${p._id}`);
        })
        .catch((errors) => {
            req.flash('error', errors);
            return res.redirect('/sell');
        });
}

module.exports = { init };
