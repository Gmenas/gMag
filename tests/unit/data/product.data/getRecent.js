/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const ProductData = require('../../../../data/product.data');

describe('ProductData.getRecent()', () => {
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
        sut.getRecent(3);
        expect(sut.get.calledWith({}, { _id: -1 }, 3)).to.be.true;
    });

    it('expect to call BaseData.get() with count 0 when not specified', () => {
        sut.getRecent();
        expect(sut.get.calledWith({}, { _id: -1 }, 0)).to.be.true;
    });

    afterEach(() => {
        utils.getSuper(sut).get = get;
    });
});
