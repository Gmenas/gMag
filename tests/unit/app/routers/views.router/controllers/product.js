/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

// eslint-disable-next-line max-len
const productController = require('./../../../../../../app/routers/views.router/controllers/product');
const reqResMock = require('./../../req.res.mock');

describe('productController.init()', () => {
    let sut;
    let req;
    let res;
    const seller = {
        _id: {
            equals: () => {
                return true;
            },
        },
    };
    const product = {
        title: 'product',
        seller: seller,
        sellerId: 0,
    };
    const reqUser = { _id: 0 };
    const flash = () => 'flash';
    const data = {
        users: {
            getById: () => {
                return Promise.resolve(seller);
            },
        },
        products: {
            getById: () => {
                return Promise.resolve(product);
            },
        },
    };

    beforeEach(() => {
        sut = productController;
        req = reqResMock.getReqMock({
            flash: flash,
            user: reqUser,
            params: {
                id: 0,
            },
        });
        res = reqResMock.getResMock();
        res.renderError = sinon.spy();
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
                expect(res.renderError.called).to.be.false;
                expect(res.viewName).to.equal('product');
                done();
            })
            .catch(done);
    });

    it('expect to pass correct context', (done) => {
        const context = {
            title: `Details for ${product.title}`,
            user: reqUser,
            flash: flash(),
            product: product,
        };

        sut.init(req, res, data)
            .then(() => {
                expect(res.context).to.have.keys([
                    'title',
                    'user',
                    'flash',
                    'product',
                    'isViewers',
                    'windowCtx',
                ]);
                done();
            })
            .catch(done);
    });
});
