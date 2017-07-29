function init(req, res, data) {
    if (!req.user) {
        return res.renderError(
            'You must be logged in to add a product.'
        );
    }

    return require('./uploader').init(data)(req, res, (err) => {
        const acceptedFiles = [
            'image/gif',
            'image/png',
            'image/jpeg',
            'image/bmp',
        ];
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
            if (err) {
                return reject('File too large');
            }
            if (photo && acceptedFiles.indexOf(photo.mimetype) < 0) {
                data.gfs.remove({ _id: product.photoId });
                return reject('Invalid image!');
            }
            return resolve();
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
