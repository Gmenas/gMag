/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const Product = require('./../../../../models/product');

describe('Product.validate()', () => {
    const sut = Product;
    let validProduct;

    describe('when product is of invalid type', () => {
        it('expect to return array with error', () => {
            const result = sut.validate({});

            expect(result).to.be.an('array');
            expect(result[0]).to.match(/invalid.*type/i);
        });
    });

    describe('when product is of valid type', () => {
        beforeEach(() => {
            validProduct = {
                title: 'valid',
                description: 'valid',
                price: 100,
                categoryId: {},
                sellerId: {},
            };
        });

        describe('but with empty title', () => {
            it('expect to return array with correct error', () => {
                validProduct.title = '';
                const result = sut.validate(validProduct);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /title.*between.*characters/i
                );
            });
        });

        describe('but with empty description', () => {
            it('expect to return array with correct error', () => {
                validProduct.description = '';
                const result = sut.validate(validProduct);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /description.*between.*characters/i
                );
            });
        });

        describe('but with negative price', () => {
            it('expect to return array with correct error', () => {
                validProduct.price = -1;
                const result = sut.validate(validProduct);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /price.*zero/i
                );
            });
        });

        describe('but with too big price', () => {
            it('expect to return array with correct error', () => {
                validProduct.price = Number.MAX_SAFE_INTEGER;
                const result = sut.validate(validProduct);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /expensive/i
                );
            });
        });
    });
});
