const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/_base.data');

describe('BaseData.getById()', () => {
    const ModelClass = class { };
    let items = [];
    const toArray = () => {
        return Promise.resolve(items);
    };
    const find = () => {
        return {
            toArray,
        };
    };
    const findOne = () => {
        return Promise.resolve(items[0]);
    };
    const collection = {
        find,
        findOne,
    };
    const db = {
        collection: () => {
            return collection;
        },
    };

    let sut = null;

    beforeEach(() => {
        items = [{ _id: 1 }];
        sut = new BaseData(db, ModelClass, '');
    });

    describe('with invalid ObjectId', () => {
        it('expect to reject promise with correct msg', (done) => {
            sut.getById('not valid')
                .then(() => {
                    done(new Error('promise should be rejected'));
                })
                .catch((e) => {
                    expect(e).to.match(/invalid.+id/i);
                    done();
                });
        });
    });

    describe('with valid ObjectId', () => {
        it('expect to resolve promise with item', (done) => {
            sut.getById(1)
                .then((i) => {
                    expect(i._id).to.deep.equal(1);
                    done();
                });
        });
    });
});
