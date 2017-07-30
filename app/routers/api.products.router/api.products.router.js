function init(app, data) {
    app.post('/api/products', (req, res) =>
        require('./controllers/add').init(req, res, data)
    );

    app.get('/api/products', (req, res) =>
        require('./controllers/get').init(req, res, data)
    );

    app.delete('/api/products', (req, res) =>
        require('./controllers/delete').init(req, res, data)
    );
}

module.exports = { init };
