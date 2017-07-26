/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const Product = require('./../../../../models/product');

describe('Product.equals()', () => {
    const sut = Product;

    it('expect to return comparer by title', () => {
        const result = sut.equals({});

        expect(result).to.haveOwnProperty('title');
    });
});
