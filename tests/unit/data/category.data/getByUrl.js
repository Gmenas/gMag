
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const CategoryData = require('../../../../data/category.data');

describe('CategoryData.getByUrl()', () => {
    let sut;
    let category;
    let get;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    beforeEach(() => {
        sut = new CategoryData(db, ModelClass, '');
        get = utils.getSuper(sut).get;
    });

    describe('when category exists', () => {
        beforeEach(() => {
            category = 1;
            utils.getSuper(sut).get = sinon.spy(() => {
                return Promise.resolve([category]);
            });
        });

        it('expect to call BaseData.get() with correct args', () => {
            sut.getByUrl('test');
            expect(sut.get.calledWith({ url: 'test' })).to.equal(true);
        });

        it('expect to resolve promise with category', (done) => {
            sut.getByUrl('test')
                .then((c) => {
                    expect(c).to.equal(category);
                    done();
                });
        });
    });

    describe('when category does not exist', () => {
        beforeEach(() => {
            utils.getSuper(sut).get = sinon.spy(() => {
                return Promise.resolve([]);
            });
        });

        it('expect to reject promise with error', (done) => {
            sut.getByUrl('test')
                .then((c) => {
                    done(new Error('Promise should be rejected'));
                })
                .catch((e) => {
                    expect(e).to.match(/category.*exist/i);
                    done();
                });
        });
    });

    afterEach(() => {
        utils.getSuper(sut).get = get;
    });
});
