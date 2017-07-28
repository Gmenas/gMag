const BaseData = require('./base.data');
const Product = require('../models/product');

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product, 'products');
    }

    getRecent(count) {
        count = count || 0;
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

    getByQueryFilter(categoryId, qFilter, count, skip) {
        const filter = {
            categoryId: categoryId,
            price: {
                $gte: qFilter.price.min,
                $lte: qFilter.price.max,
            },
            $or: [
                { title: new RegExp(qFilter.text, 'i') },
                { description: new RegExp(qFilter.text, 'i') },
            ],
        };
        return this.get(filter, { _id: -1 }, count, skip);
    }

    makeValidFilter(f) {
        f = f || {};
        f.textStr = f.textStr || '.*';
        f.priceArr = f.priceArr || [];
        return {
            text: f.textStr,
            price: {
                min: Number(f.priceArr[0]) || 0,
                max: Number(f.priceArr[1]) || 10000,
            },
        };
    }
}

module.exports = ProductData;
