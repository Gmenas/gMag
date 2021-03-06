
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const ProductData = require('../../../../data/product.data');

describe('ProductData.getByQueryFilter()', () => {
    let sut;
    let filter;
    let get;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
        get = utils.getSuper(sut).get;
        utils.getSuper(sut).get = sinon.spy();
        sut._makeValidFilter = sinon.spy((x) => x);
        filter = { test: 'test' };
    });

    it('expect to call _makeValidFilter() with correct argument', () => {
        sut.getByQueryFilter(filter, 1, 2);
        expect(sut._makeValidFilter.calledWith(
            filter
        )).to.equal(true);
    });

    it('expect to call BaseData.get() with correct argument', () => {
        sut.getByQueryFilter(filter, 1, 2);
        expect(sut.get.calledWith(
            filter, { _id: -1 }, 1, 2
        )).to.equal(true);
    });

    afterEach(() => {
        utils.getSuper(sut).get = get;
    });
});
