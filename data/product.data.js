const BaseData = require('./_base.data');
const Product = require('../models/product');

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product, 'products');
    }
}

module.exports = ProductData;
