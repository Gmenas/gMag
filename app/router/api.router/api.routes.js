const init = (app, data) => {
    app.get('/api/products/:category', (req, res) => {

    });

    app.post('/api/products/add', (req, res) => {
        const product = {
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
        };

        let categoryId;
        let productId;
        data.categories.find({ title: product.category })
            .then((results) => {
                if (results.length === 0) {
                    return Promise.reject(
                        `Category "${product.category}" does not exist.`
                    );
                }
                categoryId = results[0].id;
                return categoryId;
            })
            .then(() => {
                return data.products.create(product);
            })
            .then((productModel) => {
                productId = productModel.id;
            })
            .then(() => {
                data.categories.addProductToCategory(categoryId, productId);
                res.redirect(`/details/${productId}`);
            })
            .catch((msg) => {
                const context = {
                    title: 'Error',
                    errorMsg: msg,
                };
                return res.render('error', context);
            });
    });
};

module.exports = { init };
