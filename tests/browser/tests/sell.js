/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const webDriver = require('./utils/web.driver');
const ui = require('./utils/ui.ext');

describe('Register', () => {
    let driver;
    const appUrl = 'http://localhost:3000/sell';
    const selectors = {
        title: 'input[name=title]',
        description: 'textarea[name=description]',
        categoryDropdown: 'select[name=categoryUrl]',
        categoryOptions: 'select[name=categoryUrl] option',
        price: 'input[name=price]',
        submit: 'button[type=submit]',
    };
    const validProduct = {
        title: 'Test product 1',
        description: 'Test product 1 description',
        category: 0,
        price: '500',
    };

    before(() => {
        driver = webDriver.get();
        ui.setDriver(driver);
    });

    describe('Actions', () => {
        function addProduct(product) {
            return driver.get(appUrl)
                .then(() =>
                    ui.setValue(selectors.title, product.title)
                )
                .then(() =>
                    ui.setValue(selectors.description, product.description)
                )
                .then(() =>
                    ui.click(selectors.categoryDropdown))
                .then(() => ui.click(selectors.categoryOptions))
                .then(() =>
                    ui.setValue(selectors.price, product.price)
                )
                .then(() => ui.click(selectors.submit));
        }

        describe('Add valid user', () => {
            it('expect to include product title in page title', (done) => {
                addProduct(validProduct)
                    .then(() => {
                        driver.getTitle()
                            .then((title) => {
                                expect(title).to.include(validProduct.title);
                                done();
                            });
                    });
            });
        });
    });
});
