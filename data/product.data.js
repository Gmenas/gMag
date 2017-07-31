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
        return super.get({}, { _id: -1 }, count);
    }

    getByCategoryId(id, count) {
        count = count || 0;
        return super.get({ categoryId: id }, { _id: -1 }, count);
    }

    getBySellerId(id, count) {
        count = count || 0;
        return super.get({ sellerId: id }, { _id: -1 }, count);
    }

    getByQueryFilter(filter, count, skip) {
        filter = this._makeValidFilter(filter);
        return super.get(filter, { _id: -1 }, count, skip);
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

    deleteOne(filter, gfs) {
        super.getOne(filter)
            .then((product) => {
                if (product.photoId) {
                    gfs.remove({ _id: product.photoId });
                }
            });
        return super.deleteOne(filter);
    }

    favourite(filter, userId) {
        return new Promise((resolve, reject) => {
            super.getOne(filter).then((product) => {
                if (!this.favouritedBy(product, userId)) {
                    this._collection.update(filter, {
                        $push: { favouritedBy: ObjectId(userId) },
                    });
                    return resolve({ favourited: true });
                }

                this._collection.update(filter, {
                    $pull: { favouritedBy: ObjectId(userId) },
                });
                return resolve({ favourited: false });
            });
        });
    }

    favouritedBy(product, userId) {
        if (product.favouritedBy) {
            const foundId = product
                .favouritedBy
                .find((id) => id.equals(userId));
            return !!foundId;
        }
        return false;
    }
}

module.exports = ProductData;
