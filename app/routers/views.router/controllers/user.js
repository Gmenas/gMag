function init(req, res, data) {
    return data
        .users.getByUsername(req.params.username)
        .then((user) => {
            if (!user) {
                return Promise.reject('User does not exist');
            }
            let isViewers = false;
            if (req.user) {
                isViewers = user._id.equals(req.user._id);
            }

            const userProductsPromise = data.products
                .getBySellerId(user._id, 9);
            const favouriteProductsPromise = isViewers ?
                data.products.getFavouritedByUser(user._id, 9) :
                Promise.resolve(null);

            return Promise.all([
                userProductsPromise,
                favouriteProductsPromise,
            ])
                .then(([userProducts, userFavourites]) => {
                    const context = {
                        title: user.username,
                        user: req.user,
                        flash: req.flash(),
                        userProfile: user,
                        userProducts: userProducts,
                        userFavourites: userFavourites,
                        isViewers: isViewers,
                        windowCtx: {
                            productFilter: { sellerId: user._id },
                            favFilter: { favouritedBy: user._id },
                        },
                    };
                    return res.render('user', context);
                });
        })
        .catch((err) => {
            return res.renderError(err);
        });
}

module.exports = { init };
