/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

// eslint-disable-next-line max-len
const categoryController = require('./../../../../../../app/routers/views.router/controllers/category');
const reqResMock = require('./../../req.res.mock');

describe('categoryController.init()', () => {
    let sut;
    let req;
    let res;
    const query = {};
    const params = {};
    const category = {
        _id: 0,
    };
    const products = [3, 4];
    const user = 'user';
    const flash = () => 'flash';
    const data = {
        categories: {
            getByUrl: () => {
                return Promise.resolve(category);
            },
        },
        products: {
            getByQueryFilter: () => {
                return Promise.resolve(products);
            },
            makeValidFilter: (x) => {
                return x;
            },
        },
    };

    beforeEach(() => {
        sut = categoryController;
        req = reqResMock.getReqMock({
            flash,
            user,
            params,
            query,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.viewName).to.equal('category');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.context).to.have.keys([
                    'title',
                    'user',
                    'flash',
                    'category',
                    'products',
                    'filter',
                    'slider',
                    'windowCtx',
                ]);
                done();
            })
            .catch(done);
    });
});
