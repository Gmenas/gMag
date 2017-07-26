/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

// eslint-disable-next-line max-len
const loginController = require('./../../../../../../app/routers/views.router/controllers/login');
const reqResMock = require('./../../req.res.mock');

describe('loginController.init()', () => {
    let sut;
    let req;
    let res;
    const user = 'user';
    const flash = () => 'flash';

    beforeEach(() => {
        sut = loginController;
        req = reqResMock.getReqMock({
            flash,
            user,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res)
            .then(() => {
                expect(res.viewName).to.equal('login');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        const context = {
            title: 'Login',
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
