function init(req, res, data) {
    if (!req.user) {
        return res.status(403).send('Forbidden!');
    }

    return data
        .products.getById(req.body.productId)
        .then((product) => {
            if (!product.sellerId.equals(req.user._id)) {
                return res.status(403).send('Forbidden!');
            }
            return data.products.deleteOne({ _id: product._id }, data.gfs)
                .then(() => res.send({ deleted: true }));
        })
        .catch(console.log);
}

module.exports = { init };
