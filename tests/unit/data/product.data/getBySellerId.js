/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const ProductData = require('../../../../data/product.data');

describe('ProductData.getBySellerId()', () => {
    let sut;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
        utils.getSuperInstance(sut).get = sinon.spy();
    });

    it('expect to call BaseData.get() with correct args', () => {
        sut.getBySellerId(42, 3);
        expect(sut.get.calledWith(
            { sellerId: 42 }, { _id: -1 }, 3
        )).to.be.true;
    });

    it('expect to call BaseData.get() with count 0 when not specified', () => {
        sut.getBySellerId(42);
        expect(sut.get.calledWith(
            { sellerId: 42 }, { _id: -1 }, 0
        )).to.be.true;
    });
});
