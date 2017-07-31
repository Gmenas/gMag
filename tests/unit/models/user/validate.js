
const { expect } = require('chai');

const User = require('./../../../../models/user');

describe('User.validate()', () => {
    const sut = User;
    let validUser;

    describe('when user is of invalid type', () => {
        it('expect to return array with error', () => {
            const result = sut.validate({});

            expect(result).to.be.an('array');
            expect(result[0]).to.match(/invalid.*type/i);
        });
    });

    describe('when user is of valid type', () => {
        beforeEach(() => {
            validUser = {
                username: 'valid',
                email: 'valid@domain.com',
                password: '123456',
            };
        });

        describe('but with empty username', () => {
            it('expect to return array with correct error', () => {
                validUser.username = '';
                const result = sut.validate(validUser);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /username.*between.*characters/i
                );
            });
        });

        describe('but with invalid email', () => {
            it('(empty) expect to return array with error', () => {
                validUser.email = '';
                const result = sut.validate(validUser);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /email.*valid/i
                );
            });

            it('(random str) expect to return array with error', () => {
                validUser.email = 'adsasadas';
                const result = sut.validate(validUser);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /email.*valid/i
                );
            });

            it('(random str with @) expect to return array with error', () => {
                validUser.email = 'adsa@sadas';
                const result = sut.validate(validUser);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /email.*valid/i
                );
            });
        });

        describe('but with empty password', () => {
            it('expect to return array with error', () => {
                validUser.password = '123';
                const result = sut.validate(validUser);

                expect(result).to.be.an('array');
                expect(result[0]).to.match(
                    /password.*characters/i
                );
            });
        });
    });
});
