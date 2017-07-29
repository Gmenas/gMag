const { expect } = require('chai');

const Data = require('./../../../../data');

describe('Data init()', () => {
    let sut;
    const dbObj = {
        db: {
            collection: () => { },
        },
        gfs: null,
    };

    beforeEach(() => {
        sut = Data;
    });

    it('expect to resolve promise with correct object', (done) => {
        sut.init(dbObj)
            .then((data) => {
                expect(data).to.haveOwnProperty('categories');
                expect(data).to.haveOwnProperty('products');
                expect(data).to.haveOwnProperty('users');
                expect(data).to.haveOwnProperty('session');
                expect(data).to.haveOwnProperty('gfs');
                done();
            })
            .catch(done);
    });
});
