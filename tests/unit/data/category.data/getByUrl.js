/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../utils');

const CategoryData = require('../../../../data/category.data');

describe('CategoryData.getByUrl()', () => {
    let sut;
    let category;
    const ModelClass = class { };
    const db = {
        collection: () => { },
    };

    describe('when category exists', () => {
        beforeEach(() => {
            sut = new CategoryData(db, ModelClass, '');
            category = 1;
            utils.getSuperInstance(sut).get = sinon.spy(() => {
                return Promise.resolve([category]);
            });
        });

        it('expect to call BaseData.get() with correct args', () => {
            sut.getByUrl('test');
            expect(sut.get.calledWith({ url: 'test' })).to.be.true;
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
            sut = new CategoryData(db, ModelClass, '');
            utils.getSuperInstance(sut).get = sinon.spy(() => {
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
});
