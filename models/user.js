const CryptoJS = require('crypto-js');

class User {
    static validate(user) {
        const errors = [];

        if (!this._isValidType(user)) {
            errors.push('Invalid user type.');
            return errors;
        }

        if (!/^[a-zA-Z0-9_\.]{4,25}$/.test(user.username)) {
            errors.push(
                'Username must be between 4 and 25 characters ' +
                'and consist of [a-zA-Z0-9_\.]'
            );
        }

        if (!/.+@.+\..+/.test(user.email)) {
            errors.push('Email must be valid.');
        }

        if (!/^.{8,40}$/.test(user.password)) {
            errors.push(
                'Password must be between 8 and 40 characters.'
            );
        }

        return errors;
    }

    static _isValidType(user) {
        return !!user &&
            typeof user.username === 'string' &&
            typeof user.email === 'string' &&
            typeof user.password === 'string';
    }

    static toDbModel(user) {
        // eslint-disable-next-line new-cap
        const passwordHash = CryptoJS.SHA256(user.password).toString();

        return {
            username: user.username,
            email: user.email,
            password: passwordHash,
        };
    }

    static equals(user) {
        return { username: user.username };
    }
}

module.exports = User;
