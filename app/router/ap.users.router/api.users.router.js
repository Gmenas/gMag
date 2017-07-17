const passport = require('passport');
const utils = require('./../../utils');

const init = (app, data) => {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));

    app.post('/register', (req, res, next) => {
        const formData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        data
            .users.create(formData)
            .then((user) => {
                req.flash('info',
                    'Succesfully registered!'
                );
                res.redirect('/');
            })
            .catch((errors) => {
                req.flash('error', errors);
                res.redirect('/register');
            });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

module.exports = { init };
