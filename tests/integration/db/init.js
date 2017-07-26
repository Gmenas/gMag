/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const Db = require('./../../../db');

describe('db.init()', () => {
    const connectionStr = 'mongodb://localhost/gmag';
    const sut = Db;

    it('expect to return promise with collection fn', (done) => {
        sut.init(connectionStr)
            .then((db) => {
                expect(db.collection).to.be.a('function');
                db.close();
                done();
            })
            .catch(done);
    });
});
