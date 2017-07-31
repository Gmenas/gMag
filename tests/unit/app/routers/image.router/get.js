
const { expect } = require('chai');
const sinon = require('sinon');

// eslint-disable-next-line max-len
const getImageController = require('../../../../../app/routers/image.router/controllers/get');
const reqResMock = require('../req.res.mock');

describe('getImageController.init()', () => {
    let sut;
    const req = reqResMock.getReqMock({
        params: { id: 1 },
    });
    const res = { res: 'test' };
    const data = {
        gfs: {
            exist: sinon.spy(
                (filter, cb) => cb(null, true)
            ),
            createReadStream: (filter) => {
                return {
                    pipe: sinon.spy(),
                };
            },
        },
    };

    beforeEach(() => {
        sut = getImageController;
    });

    it('expect to call data.gfs.exist', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(data.gfs.exist.called).to.equal(true);
                done();
            })
            .catch(done);
    });
});
