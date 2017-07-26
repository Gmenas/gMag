/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

// eslint-disable-next-line max-len
const productController = require('./../../../../../../app/routers/views.router/controllers/product');
const reqResMock = require('./../../req.res.mock');

describe('productController.init()', () => {
    let sut;
    let req;
    let res;
    const seller = 'seller';
    const product = {
        title: 'product',
        seller: seller,
        sellerId: 0,
    };
    const reqUser = 'user';
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
        res.renderError = () => { };
    });

    it('expect to render correct view', (done) => {
        sut.init(req, res, data)
            .then(() => {
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
                expect(res.context).to.deep.equal(context);
                done();
            })
            .catch(done);
    });
});
