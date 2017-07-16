const CryptoJS = require('crypto-js');

class User {
    static getDataBaseModel(model) {
        const {
            email,
            user_name,
            user_password,
        } = model;

        const passwordHash = CryptoJS.SHA256(user_password).toString();

        return {
            email: email,
            user_name: user_name,
            user_password: passwordHash,
        };
    }

    static validate(user) {
        const {
            email,
            user_name,
            user_password,
        } = user;

        const error = [];

        this._validateStringField('user name', 4, /^[a-zA-Z0-9_\.]+$/,
            user_name, error);
        this._validateEmail(email, error);

        if (user_password.length < 8) {
            error.push({
                field: 'password',
                message: 'Invalid password, must be at least 8 symbol',
            });
        }
        if (error.length !== 0) {
            let allError = '';
            error.forEach((er) => {
                allError += `\n\r ! Error:
                 ${er.message}`;
            });
            return allError;
        }

        return 'no';
    }

    static _validateStringField(name, min, regex, field, error) {
        if (field.length < min || !regex.test(field)) {
            error.push({
                field: name,
                message: `Invalid must be at least 4 symbol 
                and consist only [a-zA-Z0-9_\.]`,
            });
        }
    }

    static _validateEmail(field, error) {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexEmail.test(field)) {
            error.push({
                field: 'email',
                message: 'Invalid email must be format: [email@abv.bg]',
            });
        }
    }
}
module.exports = User;