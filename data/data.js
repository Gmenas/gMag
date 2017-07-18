const CategoryData = require('./category.data');
const ProductData = require('./product.data');
const UserData = require('./user.data');
const SessionData = require('./session.data');

const init = (db) => {
    return Promise.resolve({
        categories: new CategoryData(db),
        products: new ProductData(db),
        users: new UserData(db),
        session: new SessionData(db),
    });
};

module.exports = { init };
