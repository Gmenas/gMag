const init = () => {
    return {
        home: require('./home.controller').init,
        browseCategories: require('./browse.categories.controller').init,
        browseCategory: require('./browse.category.controller').init,
        sell: require('./sell.controller').init,
        product: require('./product.controller').init,
    };
};

module.exports = { init };
