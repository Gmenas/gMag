const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const controllers = require('./controllers').init();

const init = (app, data) => {
    app.get('/',
        (req, res) => controllers.home(req, res, data)
    );

    app.get('/browse',
        (req, res) => controllers.browseCategories(req, res, data)
    );

    app.get('/browse/:category',
        (req, res) => controllers.browseCategory(req, res, data)
    );

    app.get('/sell',
        ensureLoggedIn('/login'),
        (req, res) => controllers.sell(req, res, data)
    );

    app.get('/product/:id',
        (req, res) => controllers.product(req, res, data)
    );

    app.get('/login', (req, res) => {
        const context = {
            title: 'Login',
            user: req.user,
            flash: req.flash(),
        };
        return res.render('login', context);
    });

    app.get('/register', (req, res) => {
        const context = {
            title: 'Register',
            user: req.user,
            flash: req.flash(),
        };
        return res.render('register', context);
    });
};

module.exports = { init };
