const ObjectId = require('mongodb').ObjectID;

const BaseData = require('./_base.data');
const Category = require('../models/category');

class CategoryData extends BaseData {
    constructor(db) {
        super(db, Category, 'categories');
    }

    addProductToCategory(categoryId, productId) {
        this._collection.update(
            // eslint-disable-next-line new-cap
            { _id: ObjectId(categoryId) },
            { $push: { products: productId } }
        );
    }
}

module.exports = CategoryData;
