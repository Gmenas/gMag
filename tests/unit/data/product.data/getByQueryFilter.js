/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const ProductData = require('../../../../data/product.data');

describe('ProductData.getByQueryFilter()', () => {
    let sut;
    let filter;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new ProductData(db, ModelClass, '');
        utils.getSuperInstance(sut).get = sinon.spy();
        sut._makeValidFilter = sinon.spy((x) => x);
        filter = { test: 'test' };
    });

    it('expect to call _makeValidFilter() with correct argument', () => {
        sut.getByQueryFilter(filter, 1, 2);
        expect(sut._makeValidFilter.calledWith(
            filter
        )).to.be.true;
    });

    it('expect to call BaseData.get() with correct argument', () => {
        sut.getByQueryFilter(filter, 1, 2);
        expect(sut.get.calledWith(
            filter, { _id: -1 }, 1, 2
        )).to.be.true;
    });
});
