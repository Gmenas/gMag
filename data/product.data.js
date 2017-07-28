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

    getByQueryFilter(categoryId, filter, skip, count) {
        return this.get(
            {
                categoryId: categoryId,
                price: {
                    $gte: filter.price.min,
                    $lte: filter.price.max,
                },
                $or: [
                    { title: new RegExp(filter.text, 'i') },
                    { description: new RegExp(filter.text, 'i') },
                ],
            },
            { _id: -1 },
            skip,
            count
        );
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
