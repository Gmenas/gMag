const { ensureLoggedIn } = require('connect-ensure-login');

function init(app, data) {
    app.get('/', (req, res) =>
        require('./controllers/home').init(req, res, data)
    );

    app.get('/browse', (req, res) =>
        require('./controllers/categories').init(req, res, data)
    );

    app.get('/browse/:categoryUrl', (req, res) =>
        require('./controllers/category').init(req, res, data)
    );

    app.get('/sell',
        ensureLoggedIn('/login'),
        (req, res) =>
            require('./controllers/sell').init(req, res, data)
    );

    app.get('/product/:id', (req, res) =>
        require('./controllers/product').init(req, res, data)
    );

    app.get('/login', (req, res) =>
        require('./controllers/login').init(req, res)
    );

    app.get('/register', (req, res) =>
        require('./controllers/register').init(req, res)
    );

    app.get('/user/:username', (req, res) =>
        require('./controllers/user').init(req, res, data)
    );
}

module.exports = { init };
