const init = (app, data) => {
    app.get('/api/products/:category', (req, res) => {
        // all products in this category in json format
        return res.send();
    });
};

module.exports = { init };
