
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const ProductData = require('../../../../data/product.data');

describe('ProductData.getByCategoryId()', () => {
    let sut;
    let get;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
        get = utils.getSuper(sut).get;
        utils.getSuper(sut).get = sinon.spy();
    });

    it('expect to call BaseData.get() with correct args', () => {
        sut.getByCategoryId(42, 3);
        expect(sut.get.calledWith(
            { categoryId: 42 }, { _id: -1 }, 3
        )).to.equal(true);
    });

    it('expect to call BaseData.get() with count 0 when not specified', () => {
        sut.getByCategoryId(42);
        expect(sut.get.calledWith(
            { categoryId: 42 }, { _id: -1 }, 0
        )).to.equal(true);
    });

    afterEach(() => {
        utils.getSuper(sut).get = get;
    });
});
