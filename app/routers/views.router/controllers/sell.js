const init = (req, res, data) => {
    data
        .categories.getAll()
        .then((categories) => {
            const context = {
                title: 'Sell',
                user: req.user,
                flash: req.flash(),
                categories: categories,
            };
            return res.render('sell', context);
        });
};

module.exports = { init };
