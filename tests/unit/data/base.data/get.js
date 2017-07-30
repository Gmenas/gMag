const { expect } = require('chai');
const utils = require('../utils');

const BaseData = require('../../../../data/base.data');

describe('BaseData.get()', () => {
    let sut;
    const ModelClass = class { };
    const items = ['item'];
    const db = utils.getDbMock(items);

    beforeEach(() => {
        sut = new BaseData(db, ModelClass, '');
    });

    it('expect to call find, sort and limit with no error', (done) => {
        sut.get({}, {}, 1, 1)
            .then((arr) => {
                done();
            })
            .catch(done);
    });

    it('expect to return array', (done) => {
        sut.get({}, {}, 1, 1)
            .then((arr) => {
                expect(arr).to.be.an('array');
                done();
            })
            .catch(done);
    });
});
