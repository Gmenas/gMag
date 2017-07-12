const CategoryData = require('./category.data');
const initialData = require('./initial.data');

const init = (db) => {
    return Promise.resolve({
        categories: new CategoryData(db),
    });
};

module.exports = { init };
