
const { expect } = require('chai');
const utils = require('../utils');

const CategoryData = require('../../../../data/category.data');

describe('CategoryData.getAll()', () => {
    let sut;
    const ModelClass = class { };
    const items = [1, 2, 3];
    const db = utils.getDbMock(items);

    beforeEach(() => {
        sut = new CategoryData(db, ModelClass, '');
    });

    it('expect BaseData.get() to return all items', () => {
        sut.getAll()
        .then((result) => {
            expect(result).to.deep.equal(items);
        });
    });
});
