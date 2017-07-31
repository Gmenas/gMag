
const { expect } = require('chai');

// eslint-disable-next-line max-len
const categoriesController = require('./../../../../../../app/routers/views.router/controllers/categories');
const reqResMock = require('./../../req.res.mock');

describe('categoriesController.init()', () => {
    let sut;
    let req;
    let res;
    const query = {};
    const categories = [{ }, { }];
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
            getByQueryFilter: () => {
                return Promise.resolve(products);
            },
            makeValidFilter: (x) => {
                return x;
            },
        },
    };

    beforeEach(() => {
        sut = categoriesController;
        req = reqResMock.getReqMock({
            flash,
            user,
            query,
        });
        res = reqResMock.getResMock();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.viewName).to.equal('categories');
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
                    'categories',
                ]);
                done();
            })
            .catch(done);
    });
});
