const BaseData = require('./base.data');
const Category = require('../models/category');

class CategoryData extends BaseData {
    constructor(db) {
        super(db, Category, 'categories');
    }

    getAll() {
        return this.get({}, { _id: 1 });
    }

    getByUrl(url) {
        return this.get({ url: url })
            .then((result) => {
                if (result.length === 0) {
                    return Promise.reject('Category does not exist.');
                }
                return Promise.resolve(result[0]);
            });
    }
}

module.exports = CategoryData;
