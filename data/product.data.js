const BaseData = require('./_base.data');
const Product = require('../models/product');

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product, 'products');
    }

    getRecent(count) {
        return this.get({}, { _id: -1 }, count);
    }

    getByCategoryId(id, filterSearch, count) {
        count = count || 0;
        const searchText = filterSearch.searchText || '.*';
        let priceRange = filterSearch.priceRange;
        if (!priceRange) {
            priceRange = '0,1000';
        }
        priceRange = priceRange.split(',').map(Number);
        const min = priceRange[0];
        const max = priceRange[1];
        return this.get({
            $and: [
                { category: id },
                { price: { $gt: min, $lt: max } },
                {
                    $or: [{
                            title: {
                                $regex: `${searchText}`,
                                $options: '.*'
                            }
                        },
                        {
                            description: {
                                $regex: `${searchText}`,
                                $options: '.*'
                            }
                        },
                    ],
                },
            ],
        }, { _id: -1 }, count);
    }
    getBySellerId(id, count) {
        count = count || 0;
        return this.get({ sellerId: id }, { _id: -1 }, count);
    }
}

module.exports = ProductData;