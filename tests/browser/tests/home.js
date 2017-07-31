
const { expect } = require('chai');
const webDriver = require('./utils/web.driver');
const ui = require('./utils/ui.ext');

describe('Home', () => {
    let driver;
    const appUrl = 'http://localhost:3000';
    const selectors = {
        h1: 'h1',
        browse: '#browse',
        sell: '#sell',
        register: '#register',
        login: '#login',
    };

    before(() => {
        driver = webDriver.get();
        ui.setDriver(driver);
    });

    it(`expect h1 with text 'Welcome to gMag'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.getText(selectors.h1))
            .then((text) => {
                expect(text).to.match(/welcome to gmag/i);
                done();
            });
    });

    it(`expect link for 'browse'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor(selectors.browse))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/browse');
                done();
            });
    });

    it(`expect link for 'sell'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor(selectors.sell))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/sell');
                done();
            });
    });

    it(`expect link for 'register'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor(selectors.register))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/register');
                done();
            });
    });

    it(`expect link for 'register'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor(selectors.login))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/login');
                done();
            });
    });
});
