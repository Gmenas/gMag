const BaseData = require('./_base.data');
const Product = require('../models/product');

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product, 'products');
    }

    getRecent(count) {
        return this.get({}, { _id: -1 }, count);
    }

    getByCategoryId(id, searchText, pricerange, count) {
        count = count || 0;
        searchText = searchText || '.*';
        if (!pricerange) {
            pricerange = '0,1000';
        }
        pricerange = pricerange.split(',').map(Number);
        const min = pricerange[0];
        const max = pricerange[1];
        return this.get({
            $or: [
                { price: { $gt: min, $lt: max } },
                { category: id },

                { title: { $regex: `${searchText}`, $options: '.*' } },
                { description: { $regex: `${searchText}`, $options: '.*' } },
            ],
        }, { _id: -1 }, count);
    }
}

module.exports = ProductData;