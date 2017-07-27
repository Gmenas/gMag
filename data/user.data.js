const BaseData = require('./base.data');
const User = require('./../models/user');
const CryptoJS = require('crypto-js');

class UserData extends BaseData {
    constructor(db) {
        super(db, User, 'users');
    }

    getByUsername(username) {
        const result = this._collection
            .findOne({ username: username });
        return Promise.resolve(result);
    }

    getUserByCredentials(username, password) {
        // eslint-disable-next-line new-cap
        const passwordHash = CryptoJS.SHA256(password).toString();

        return this.getByUsername(username)
            .then((user) => {
                if (!user || user.password !== passwordHash) {
                    return null;
                }
                return user;
            });
    }
}

module.exports = UserData;
