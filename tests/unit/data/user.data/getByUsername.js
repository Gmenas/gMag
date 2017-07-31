
const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../../data/user.data');

describe('UserData.getByUsername()', () => {
    let sut;
    const ModelClass = class { };
    const user = 1;
    const collection = {};
    const db = {
        collection: () => collection,
    };

    describe('when user exists', () => {
        beforeEach(() => {
            sut = new UserData(db, ModelClass, '');
            collection.findOne = sinon.spy(() => {
                return Promise.resolve(1);
            });
        });

        it('expect to resolve promise with user', (done) => {
            sut.getByUsername()
                .then((u) => {
                    expect(u).to.equal(user);
                    done();
                })
                .catch(done);
        });
    });
});
