/* eslint-disable new-cap */
const { ObjectId } = require('mongodb');

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

    getByQueryFilter(filter, count, skip) {
        filter = this._makeValidFilter(filter);
        return this.get(filter, { _id: -1 }, count, skip);
    }

    _makeValidFilter(f) {
        const filter = {};

        if (!f) {
            return filter;
        }
        if (f.text) {
            filter.$or = [
                { title: new RegExp(f.text, 'i') },
                { description: new RegExp(f.text, 'i') },
            ];
        }
        if (f.price) {
            filter.price = {
                $gte: Number(f.price.min),
                $lte: Number(f.price.max),
            };
        }
        if (f.categoryId) {
            filter.categoryId = ObjectId(f.categoryId);
        }
        if (f.sellerId) {
            filter.sellerId = ObjectId(f.sellerId);
        }

        return filter;
    }
}

module.exports = ProductData;
