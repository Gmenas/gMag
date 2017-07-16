const utils = require('./../../utils');

const init = (app, data) => {
    app.post('/api/products/add', (req, res) => {
        const product = {
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
        };

        data
            .categories.getByUrl( product.category )
            .then((category) => {
                product.category = category._id;
                return Promise.resolve(data.products.create(product));
            })
            .then((p) => {
                res.redirect(`/product/${p._id}`);
            })
            .catch((msg) => utils.displayError(msg, res));
    });
};

module.exports = { init };
