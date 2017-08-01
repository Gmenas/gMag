const request = require('supertest');
const testServer = require('../../utils/test.server');

describe('View tests', () => {
    let appPromise;

    before(() => {
        appPromise = testServer.start();
    });

    describe('GET /', () => {
        it('expect to return 200', (done) => {
            appPromise.then((app) => {
                request(app)
                    .get('/')
                    .expect(200)
                    .end(done);
            });
        });
    });

    describe('GET /browse', () => {
        it('expect to return 200', (done) => {
            appPromise.then((app) => {
                request(app)
                    .get('/browse')
                    .expect(200)
                    .end(done);
            });
        });
    });

    describe('GET /browse/laptops', () => {
        it('expect to return 200', (done) => {
            appPromise.then((app) => {
                request(app)
                    .get('/browse/laptops-and-desktops')
                    .expect(200)
                    .end(done);
            });
        });
    });

    describe('GET /login', () => {
        it('expect to return 200', (done) => {
            appPromise.then((app) => {
                request(app)
                    .get('/login')
                    .expect(200)
                    .end(done);
            });
        });
    });

    describe('GET /register', () => {
        it('expect to return 200', (done) => {
            appPromise.then((app) => {
                request(app)
                    .get('/register')
                    .expect(200)
                    .end(done);
            });
        });
    });

    after(() => {
        testServer.stop();
    });
});
