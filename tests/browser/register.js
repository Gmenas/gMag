/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup.driver');
const ui = require('./utils/ui.ext');

describe('Register', () => {
    let driver;
    const appUrl = 'http://localhost:3000/register';
    const selectors = {
        username: '#input-username',
        email: '#input-email',
        password: '#input-password',
        regBtn: '#input-register',
    };
    const validUser = {
        username: 'testuser1',
        email: 'testuser1@mail.com',
        password: '12345678',
    };

    before(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    describe('Expect to have input for', () => {
        it('username', (done) => {
            driver.get(appUrl)
                .then(() => ui.waitFor(selectors.username))
                .then(() => done());
        });

        it('email', (done) => {
            driver.get(appUrl)
                .then(() => ui.waitFor(selectors.email))
                .then(() => done());
        });

        it('password', (done) => {
            driver.get(appUrl)
                .then(() => ui.waitFor(selectors.password))
                .then(() => done());
        });
    });

    describe('Actions', () => {
        function register(user) {
            return driver.get(appUrl)
                .then(() =>
                    ui.setValue(selectors.username, user.username)
                )
                .then(() =>
                    ui.setValue(selectors.email, user.email)
                )
                .then(() =>
                    ui.setValue(selectors.password, user.password)
                )
                .then(() => ui.click(selectors.regBtn));
        }

        describe('Register valid user', () => {
            it('expect to contain username on page', (done) => {
                register(validUser)
                    .then(() => ui.getText('#username'))
                    .then((text) => {
                        expect(text).to.contain(validUser.username);
                        done();
                    });
            });
        });

        describe('Try to register the same user again', () => {
            it('expect to show error message', (done) => {
                register(validUser)
                    .then(() => ui.getText('.alert-danger'))
                    .then((text) => {
                        expect(text).to.contain('exists');
                        done();
                    });
            });
        });
    });

    after(() => {
        driver.quit();
    });
});
