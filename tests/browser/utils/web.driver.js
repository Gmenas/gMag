const webDriver = require('selenium-webdriver');

let _driver = null;
const _errorMsg = 'Driver must be setup first.';

function setup(browser) {
    _driver = new webDriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities({
            browserName: browser,
        })
        .build();
    return Promise.resolve(_driver);
}

function get() {
    if (_driver === null) {
        throw Error(_errorMsg);
    }
    return _driver;
}

function quit() {
    if (_driver === null) {
        throw Error(_errorMsg);
    }
    return _driver.quit();
}

module.exports = { setup, get, quit };
