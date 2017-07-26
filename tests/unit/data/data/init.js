const { expect } = require('chai');

const data = require('./../../../../data');

describe('Data init()', () => {
    const db = {
        collection: () => { },
    };

    it('expect to resolve promise with correct object', (done) => {
        data.init(db)
            .then((d) => {
                expect(d).to.haveOwnProperty('categories');
                expect(d).to.haveOwnProperty('products');
                expect(d).to.haveOwnProperty('users');
                expect(d).to.haveOwnProperty('session');
                done();
            })
            .catch(done);
    });
});
