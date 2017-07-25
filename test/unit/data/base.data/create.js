const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base.data');

describe('BaseData.create()', () => {
    let sut;
    let items;
    const ModelClass = class { };
    const findOne = () => {
        return Promise.resolve(items[0] || null);
    };
    const insert = (i) => {
        items.push(i);
        return Promise.resolve({
            ops: [i],
        });
    };
    const collection = {
        findOne,
        insert,
    };
    const db = {
        collection: () => {
            return collection;
        },
    };

    beforeEach(() => {
        items = [];
        sut = new BaseData(db, ModelClass, '');
    });

    describe('With invalid model', () => {
        beforeEach(() => {
            ModelClass.validate = (model) => {
                return ['error1'];
            };
        });

        it('expect to reject promise with reasons array', (done) => {
            sut.create({})
                .then(() => {
                    done(new Error('Promise should be rejected'));
                })
                .catch((arr) => {
                    expect(arr).to.be.an('array');
                    done();
                });
        });

        it('expect reasons array to contain atleast one reason', (done) => {
            sut.create({})
                .then(() => {
                    done(new Error('Promise should be rejected'));
                })
                .catch((arr) => {
                    expect(arr.length).to.be.least(1);
                    done();
                });
        });
    });

    describe('With valid model', () => {
        beforeEach(() => {
            ModelClass.validate = (model) => {
                return [];
            };
        });

        describe('and with toDbModel()', () => {
            beforeEach(() => {
                ModelClass.toDbModel = sinon.spy();
            });

            it('expect toDbModel() to be called with model', () => {
                const model = {};
                sut.create(model)
                    .then(() => {
                        return expect(
                            ModelClass.toDbModel.calledWith(model)
                        ).to.be.true;
                    });
            });
        });
    });
});
