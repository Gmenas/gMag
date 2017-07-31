
const { expect } = require('chai');

const User = require('./../../../../models/user');

describe('User.equals()', () => {
    const sut = User;

    it('expect to return comparer by username', () => {
        const result = sut.equals({});

        expect(result).to.haveOwnProperty('username');
    });
});
