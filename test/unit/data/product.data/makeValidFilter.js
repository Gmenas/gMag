/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const ProductData = require('../../../../data/product.data');

describe('ProductData.makeValidFilter()', () => {
    let sut;
    let validOutputFilter;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
        validOutputFilter = {
            text: '.*',
            price: {
                min: 0,
                max: 10000,
            },
        };
    });

    it('expect to return default valid filter no ragument', () => {
        const result = sut.makeValidFilter();
        expect(result).to.deep.equal(validOutputFilter);
    });

    it('expect to return default valid filter empty object', () => {
        const result = sut.makeValidFilter();
        expect(result).to.deep.equal(validOutputFilter);
    });

    it('expect to return actual filter when valid', () => {
        const filter = {
            textStr: 'test',
            priceArr: [0, 100],
        };
        const expectedOutput = {
            text: 'test',
            price: { min: 0, max: 100 },
        };
        const result = sut.makeValidFilter(filter);
        expect(result).to.deep.equal(expectedOutput);
    });
});
