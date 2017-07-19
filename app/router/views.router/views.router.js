const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const controllers = require('./controllers').init();

const init = (app, data) => {
    app.get('/',
        (req, res) => controllers.home(req, res, data)
    );

    app.get('/browse',
        (req, res) => controllers.browseCategories(req, res, data)
    );

    app.get('/browse/:categoryUrl',
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

    app.get('/user/:username', (req, res) => {
        data
            .users.getByUsername(req.params.username)
            .then((user) => {
                if (!user) {
                    return Promise.reject('User does not exist');
                }
                return data
                    .products.getBySellerId(user._id)
                    .then((products) => {
                        const context = {
                            title: user.username,
                            user: req.user,
                            flash: req.flash(),
                            userProfile: user,
                            userProducts: products,
                        };
                        return res.render('user', context);
                    });
            })
            .catch((err) => {
                return res.renderError(err);
            });
    });
    app.post('/browse/:categoryUrl', (req, res) => {
        controllers.browseCategory(req, res, data);
    });
};

module.exports = { init };