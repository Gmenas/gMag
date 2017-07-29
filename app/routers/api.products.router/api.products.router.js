function init(app, data) {
    app.post('/api/products', (req, res) =>
        require('./controllers/add').init(req, res, data)
    );

    app.get('/api/products', (req, res) =>
        require('./controllers/list').init(req, res, data)
    );
}

module.exports = { init };
