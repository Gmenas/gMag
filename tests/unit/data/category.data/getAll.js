/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const CategoryData = require('../../../../data/category.data');

describe('CategoryData.getAll()', () => {
    let sut;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new CategoryData(db, ModelClass, '');
        sut.get = sinon.spy();
    });

    it('expect to call BaseData.get() with correct args', () => {
        sut.getAll();
        expect(sut.get.calledWith({}, { _id: 1 })).to.be.true;
    });
});
