/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup.driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui.ext');

describe('Homepage', () => {
    let driver;
    const appUrl = 'http://localhost:3000';

    before(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    it(`expect h1 with text 'Welcome to gMag'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.getText('h1'))
            .then((text) => {
                expect(text).to.match(/welcome to gmag/i);
                done();
            });
    });

    it(`expect link for 'browse'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor('#browse'))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/browse');
                done();
            });
    });

    it(`expect link for 'sell'`, (done) => {
        driver.get(appUrl)
            .then(() => ui.waitFor('#sell'))
            .then((el) => el.getAttribute('href'))
            .then((href) => {
                expect(href).to.include('/sell');
                done();
            });
    });

    after(() => {
        driver.quit();
    });
});
