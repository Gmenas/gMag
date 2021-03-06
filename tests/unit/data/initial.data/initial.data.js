
const fsMock = require('mock-fs');
const { expect } = require('chai');
const sinon = require('sinon');

const initialData = require('../../../../data/initial.data');

describe('initial.data.init()', () => {
    let sut;
    const fakeFilePath = 'data.json';
    const fakeFileContent = JSON.stringify({
        categories: [
            Promise.resolve(1),
            Promise.resolve(2),
        ],
    });
    const data = {
        categories: {
            tryCreate: sinon.spy((x) => {
                return Promise.resolve(x);
            }),
        },
    };

    beforeEach(() => {
        fsMock({
            [fakeFilePath]: fakeFileContent,
        });
        sut = initialData;
    });

    it('expect to call data.categories.tryCreate() for each', (done) => {
        sut.init(data, fakeFilePath)
            .then(() => {
                expect(data.categories.tryCreate.callCount).to.equal(2);
                done();
            })
            .catch(done);
    });

    afterEach(fsMock.restore);
});
