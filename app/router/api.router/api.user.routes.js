const passport = require('passport');
const utils = require('./../../utils');
const init = (app, data) => {
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return utils.displayError('Invalid name or password!', res);
            }
            return req.logIn(user, (error) => {
                if (error) {
                    return next(error);
                }

                req.session.valid = true;
                return res.redirect('/');
            });
        })(req, res, next);
    });
    app.post('/register', (req, res, next) => {
        data.users.create(req.body).then(() => {
            req.body = {
                username: req.body.user_name,
                password: req.body.user_password,
            };
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.redirect('/login');
                }
                return req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }

                    req.session.valid = true;
                    return res.redirect('/');
                });
            })(req, res, next);
        }).catch((msg) => utils.displayError(msg, res));
    });
    app.get('/logout', (req, res) => {
        req.logout();
        req.session.valid = null;
        res.status(200).redirect('/');
    });
};

module.exports = { init };