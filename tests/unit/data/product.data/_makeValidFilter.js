/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const ProductData = require('../../../../data/product.data');

describe('ProductData._makeValidFilter()', () => {
    let sut;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
    });

    describe('when filter is undefined', () => {
        const expected = {};

        it('expect to return empty filter', () => {
            expect(sut._makeValidFilter()).to.deep.equal(expected);
        });
    });

    describe('when filter has text', () => {
        const input = {
            text: 'test',
        };
        const expected = {
            $or: [
                { title: new RegExp(input.text, 'i') },
                { description: new RegExp(input.text, 'i') },
            ],
        };

        it('expect to return filter by title and description', () => {
            expect(sut._makeValidFilter(input)).to.deep.equal(expected);
        });
    });

    describe('when filter has price', () => {
        const input = {
            price: { min: 0, max: 100 },
        };
        const expected = {
            price: {
                $gte: Number(input.price.min),
                $lte: Number(input.price.max),
            },
        };

        it('expect to return filter by price range', () => {
            expect(sut._makeValidFilter(input)).to.deep.equal(expected);
        });
    });

    describe('when filter has categoryId', () => {
        const input = {
            categoryId: 1,
        };

        it('expect to return convert it to ObjectId', () => {
            expect(sut._makeValidFilter(input).categoryId)
                .to.haveOwnProperty('id');
        });
    });

    describe('when filter has sellerId', () => {
        const input = {
            sellerId: 1,
        };

        it('expect to return convert it to ObjectId', () => {
            expect(sut._makeValidFilter(input).sellerId)
                .to.haveOwnProperty('id');
        });
    });
});
