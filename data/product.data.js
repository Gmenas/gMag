const BaseData = require('./_base.data');
const Product = require('../models/product');

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product, 'products');
    }

    getRecent(count) {
        return this.get({}, { _id: -1 }, count);
    }

    getByCategoryId(id, count) {
        count = count || 0;
        return this.get({ categoryId: id }, { _id: -1 }, count);
    }

    getBySellerId(id, count) {
        count = count || 0;
        return this.get({ sellerId: id }, { _id: -1 }, count);
    }
}

module.exports = ProductData;
