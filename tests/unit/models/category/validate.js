
const { expect } = require('chai');

const Category = require('./../../../../models/category');

describe('Category.validate()', () => {
    const sut = Category;

    describe('when category is of invalid type', () => {
        it('expect to return array with error', () => {
            const result = sut.validate({});

            expect(result).to.be.an('array');
            expect(result[0]).to.match(/invalid.*type/i);
        });
    });

    describe('when title is empty', () => {
        it('expect to return array with correct error', () => {
            const result = sut.validate({ title: '' });

            expect(result).to.be.an('array');
            expect(result[0]).to.match(/between.*characters/i);
        });
    });

    describe('when category is valid', () => {
        it('expect to return empty array', () => {
            const result = sut.validate({ title: 'valid' });

            expect(result).to.be.an('array');
            expect(result.length).to.equal(0);
        });
    });
});
