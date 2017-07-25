function init(req, res, data) {
    data
        .users.getByUsername(req.params.username)
        .then((user) => {
            if (!user) {
                return Promise.reject('User does not exist');
            }
            return data
                .products.getBySellerId(user._id)
                .then((products) => {
                    const context = {
                        title: user.username,
                        user: req.user,
                        flash: req.flash(),
                        userProfile: user,
                        userProducts: products,
                    };
                    return res.render('user', context);
                });
        })
        .catch((err) => {
            return res.renderError(err);
        });
}

module.exports = { init };
