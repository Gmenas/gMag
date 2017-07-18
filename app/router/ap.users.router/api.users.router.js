const passport = require('passport');

const init = (app, data) => {
    app.post('/login',
        passport.authenticate('local', {
            successReturnToOrRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );

    app.post('/register',
        (req, res, next) => {
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
                    req.login(user, (err) => {
                        res.redirect('/');
                    });
                })
                .catch((errors) => {
                    req.flash('error', errors);
                    res.redirect('/register');
                });
        }
    );

    app.get('/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );
};

module.exports = { init };
