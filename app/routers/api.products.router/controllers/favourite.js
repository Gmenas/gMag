function init(req, res, data) {
    if (!req.user) {
        return res.status(403).send('Forbidden!');
    }
    return data
        .products.getById(req.body.productId)
        .then((product) => {
            if (product.sellerId.equals(req.user._id)) {
                return res.status(403).send('Forbidden!');
            }
            return data
                .products.favourite({ _id: product._id }, req.user._id)
                .then((x) => res.send(x));
        })
        .catch(res.renderError);
}

module.exports = { init };
