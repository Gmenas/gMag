
const { expect } = require('chai');

// eslint-disable-next-line max-len
const registerController = require('./../../../../../../app/routers/views.router/controllers/register');
const reqResMock = require('./../../req.res.mock');

describe('registerController.init()', () => {
    let sut;
    let req;
    let res;
    const user = 'user';
    const flash = () => 'flash';

    beforeEach(() => {
        sut = registerController;
        req = reqResMock.getReqMock({
            flash,
            user,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res)
            .then(() => {
                expect(res.viewName).to.equal('register');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        const context = {
            title: 'Register',
            user: user,
            flash: flash(),
        };

        sut.init(req, res)
            .then(() => {
                expect(res.context).to.deep.equal(context);
                done();
            })
            .catch(done);
    });
});
