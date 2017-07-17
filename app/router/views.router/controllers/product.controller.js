const utils = require('./../../../utils');

const init = (req, res, data) => {
    data
        .products.getById(req.params.id)
        .then((product) => {
            const context = {
                title: `Details for ${product.title}`,
                user: req.user,
                flash: req.flash(),
                product: product,
            };
            return res.render('product', context);
        })
        .catch((msg) => utils.showErrorPage(msg, res));
};

module.exports = { init };
