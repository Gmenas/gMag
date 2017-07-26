/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

// eslint-disable-next-line max-len
const sellController = require('./../../../../../../app/routers/views.router/controllers/sell');
const reqResMock = require('./../../req.res.mock');

describe('sellController.init()', () => {
    let sut;
    let req;
    let res;
    const categories = [1, 2];
    const user = 'user';
    const flash = () => 'flash';
    const data = {
        categories: {
            getAll: () => {
                return Promise.resolve(categories);
            },
        },
    };

    beforeEach(() => {
        sut = sellController;
        req = reqResMock.getReqMock({
            flash,
            user,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.viewName).to.equal('sell');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        const context = {
            title: 'Sell',
            user: user,
            flash: flash(),
            categories: categories,
        };

        sut.init(req, res, data)
            .then(() => {
                expect(res.context).to.deep.equal(context);
                done();
            })
            .catch(done);
    });
});
