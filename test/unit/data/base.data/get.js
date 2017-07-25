const { expect } = require('chai');

const BaseData = require('../../../../data/base.data');

describe('BaseData.get()', () => {
    let sut;
    const ModelClass = class { };
    const items = ['item'];
    const toArray = () => {
        return Promise.resolve(items);
    };
    const limit = () => {
        return { toArray };
    };
    const sort = () => {
        return { limit };
    };
    const find = () => {
        return { sort };
    };
    const collection = { find };
    const db = {
        collection: () => {
            return collection;
        },
    };

    beforeEach(() => {
        sut = new BaseData(db, ModelClass, '');
    });

    it('expect to call find, sort and limit with no error', (done) => {
        sut.get(1, 1, 1)
            .then((arr) => {
                done();
            })
            .catch(done);
    });

    it('expect to return array', (done) => {
        sut.get(0, 0, 0)
            .then((arr) => {
                expect(arr).to.be.an('array');
                done();
            })
            .catch(done);
    });
});
