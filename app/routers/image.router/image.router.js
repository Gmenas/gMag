function init(app, data) {
    app.get('/uploads/:id', (req, res) =>
        require('./controllers/get').init(req, res, data)
    );
}

module.exports = { init };
