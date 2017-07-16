const CategoryData = require('./category.data');
const ProductData = require('./product.data');
const UserData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        categories: new CategoryData(db),
        products: new ProductData(db),
        users: new UserData(db),
    });
};

module.exports = { init };