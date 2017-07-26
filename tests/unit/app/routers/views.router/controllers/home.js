/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

// eslint-disable-next-line max-len
const homeController = require('./../../../../../../app/routers/views.router/controllers/home');
const reqResMock = require('./../../req.res.mock');

describe('homeController.init()', () => {
    let sut;
    let req;
    let res;
    const categories = [1, 2];
    const products = [3, 4];
    const user = 'user';
    const flash = () => 'flash';
    const data = {
        categories: {
            getAll: () => {
                return Promise.resolve(categories);
            },
        },
        products: {
            getRecent: () => {
                return Promise.resolve(products);
            },
        },
    };

    beforeEach(() => {
        sut = homeController;
        req = reqResMock.getReqMock({
            flash,
            user,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.viewName).to.equal('home');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        const context = {
            title: 'Home',
            user: user,
            flash: flash(),
            categories: categories,
            recent: products,
        };

        sut.init(req, res, data)
            .then(() => {
                expect(res.context).to.deep.equal(context);
                done();
            })
            .catch(done);
    });
});
