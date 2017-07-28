/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup.driver');
const webdriver = require('selenium-webdriver');

describe('Items routes', () => {
    let driver;

    const appUrl = 'http://localhost:3000';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('expect h1 with text \'Welcome to gMag\'', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h1')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.match(/welcome to gmag/i);
                done();
            });
    });

    afterEach(() => {
        driver.quit();
    });
});
