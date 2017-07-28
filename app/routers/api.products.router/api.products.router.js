function init(app, data) {
    app.post('/api/products/add', (req, res) =>
        require('./controllers/add').init(req, res, data)
    );

    app.get('/browse/products', (req, res, next) =>
        require('./controllers/api.products').init(req, res, data)
    );
}

module.exports = { init };
