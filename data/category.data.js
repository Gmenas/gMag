const ObjectId = require('mongodb').ObjectID;

const BaseData = require('./_base.data');
const Category = require('../models/category');

class CategoryData extends BaseData {
    constructor(db) {
        super(db, Category, 'categories');
    }

    addProductToCategory(categoryId, productId) {
        this._collection.update(
            { _id: new ObjectId(categoryId) },
            { $push: { products: productId } }
        );
    }
}

module.exports = CategoryData;
