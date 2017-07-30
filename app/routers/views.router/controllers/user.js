function init(req, res, data) {
    return data
        .users.getByUsername(req.params.username)
        .then((user) => {
            if (!user) {
                return Promise.reject('User does not exist');
            }

            const windowCtx = {
                filter: { sellerId: user._id },
            };

            return data
                .products.getBySellerId(user._id, 9)
                .then((products) => {
                    const context = {
                        title: user.username,
                        user: req.user,
                        flash: req.flash(),
                        userProfile: user,
                        userProducts: products,
                        windowCtx: windowCtx,
                    };
                    return res.render('user', context);
                });
        })
        .catch((err) => {
            return res.renderError(err);
        });
}

module.exports = { init };
