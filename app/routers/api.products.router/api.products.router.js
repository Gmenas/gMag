function init(app, data) {
    app.post('/api/products/add', (req, res) =>
        require('./controllers/add').init(req, res, data)
    );
}

module.exports = { init };
