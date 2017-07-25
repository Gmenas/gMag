const passport = require('passport');

function init(app, data) {
    app.post('/login', passport.authenticate('local', {
            successReturnToOrRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );

    app.post('/register', (req, res) =>
        require('./controllers/register').init(req, res, data)
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

module.exports = { init };
