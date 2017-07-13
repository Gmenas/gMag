const CategoryData = require('./category.data');
const ProductData = require('./product.data');

const init = (db) => {
    return Promise.resolve({
        categories: new CategoryData(db),
        products: new ProductData(db),
    });
};

module.exports = { init };
