function init(req, res, data) {
    const count = 9;
    const skip = Number(req.query.skip);

    return data
        .products
        .getByQueryFilter(req.query, count, skip)
        .then((products) => {
            const context = {
                products: products,
            };
            return res.render('partial/scroll', context);
        })
        .catch(res.renderError);
}

module.exports = { init };
