
const { expect } = require('chai');
const sinon = require('sinon');

// eslint-disable-next-line max-len
const userController = require('./../../../../../../app/routers/views.router/controllers/user');
const reqResMock = require('./../../req.res.mock');

describe('userController.init()', () => {
    let sut;
    let req;
    let res;
    const user = {
        _id: {
            equals: () => {
                return true;
            },
        },
    };
    const products = [3, 4, 5];
    const reqUser = { _id: 0 };
    const flash = () => 'flash';
    const data = {
        users: {},
        products: {
            getBySellerId: () => {
                return Promise.resolve(products);
            },
            getFavouritedByUser: () => {
                return Promise.resolve([]);
            },
        },
    };

    beforeEach(() => {
        sut = userController;
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

    describe('when user exists', () => {
        beforeEach(() => {
            data.users.getByUsername = () => {
                return Promise.resolve(user);
            };
        });

        it('expect to render correct view', (done) => {
            sut.init(req, res, data)
                .then(() => {
                    expect(res.viewName).to.equal('user');
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
                        'userProfile',
                        'userProducts',
                        'userFavourites',
                        'isViewers',
                        'windowCtx',
                    ]);
                    done();
                })
                .catch(done);
        });
    });

    describe('when user is not found', () => {
        beforeEach(() => {
            data.users.getByUsername = () => {
                return Promise.resolve(null);
            };
            res.renderError = sinon.spy();
        });

        it('expect to call res.renderError()', (done) => {
            sut.init(req, res, data)
                .then(() => {
                    expect(res.renderError.called).to.equal(true);
                    done();
                })
                .catch(done);
        });
    });
});
