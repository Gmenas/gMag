const controllers = require('./controllers').init();

const init = (app, data) => {
    app.get('/', (req, res) => {
        return controllers.home(req, res, data);
    });

    app.get('/browse', (req, res) => {
        return controllers.browseCategories(req, res, data);
    });

    app.get('/browse/:category', (req, res) => {
        return controllers.browseCategory(req, res, data);
    });

    app.get('/sell', (req, res) => {
        return controllers.sell(req, res, data);
    });

    app.get('/product/:id', (req, res) => {
        return controllers.product(req, res, data);
    });

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
