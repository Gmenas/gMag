
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base.data');

describe('BaseData.create()', () => {
    let sut;
    let items;
    const ModelClass = class { };
    const collection = {};
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
            collection.insert = (i) => {
                items.push(i);
                return Promise.resolve({
                    ops: [i],
                });
            };
        });

        describe('and with toDbModel()', () => {
            beforeEach(() => {
                ModelClass.toDbModel = sinon.spy();
            });

            it('expect toDbModel() to be called with model', (done) => {
                const model = {};
                sut.create(model)
                    .then(() => {
                        expect(
                            ModelClass.toDbModel.calledWith(model)
                        ).to.equal(true);
                        done();
                    })
                    .catch(done);
            });

            afterEach(() => {
                delete ModelClass.toDbModel;
            });
        });

        describe('and with equals()', () => {
            beforeEach(() => {
                ModelClass.equals = sinon.spy();
            });

            describe('if no item exists', () => {
                beforeEach(() => {
                    collection.findOne = () => {
                        return Promise.resolve(null);
                    };
                });

                it('expect equals() to be called with model', (done) => {
                    const model = {};
                    sut.create(model)
                        .then(() => {
                            expect(
                                ModelClass.equals.calledWith(model)
                            ).to.equal(true);
                            done();
                        })
                        .catch(done);
                });
            });

            describe('if item exists', () => {
                beforeEach(() => {
                    collection.findOne = () => {
                        return Promise.resolve(true);
                    };
                });

                it('expect promise to be rejected', (done) => {
                    sut.create({})
                        .then(() => {
                            done(new Error('Promise should be rejected'));
                        })
                        .catch(() => {
                            done();
                        });
                });
            });

            afterEach(() => {
                delete ModelClass.equals;
            });
        });
    });
});
