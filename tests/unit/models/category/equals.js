/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const Category = require('./../../../../models/category');

describe('Category.equals()', () => {
    const sut = Category;

    it('expect to return comparer by title', () => {
        const result = sut.equals({});

        expect(result).to.haveOwnProperty('title');
    });
});
