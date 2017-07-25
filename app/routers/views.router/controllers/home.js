function init(req, res, data) {
    Promise.all([
        data.categories.getAll(),
        data.products.getRecent(3),
    ])
        .then(([categories, products]) => {
            const context = {
                title: 'Home',
                user: req.user,
                flash: req.flash(),
                categories: categories,
                recent: products,
            };
            return res.render('home', context);
        });
}

module.exports = { init };
