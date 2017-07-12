const BaseData = require('./_base.data');
const Category = require('../models/category');

class CategoryData extends BaseData {
    constructor(db) {
        super(db, Category, 'categories');
    }

    create(model) {
        this._collection
            .findOne({ title: model.title })
            .then((exists) => {
                if (exists) {
                    return Promise.resolve(exists);
                }
                return super.create(model);
            });
    }
}

module.exports = CategoryData;
