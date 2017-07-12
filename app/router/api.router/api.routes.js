const init = (app) => {
    app.get('/api/items/:category', (req, res) => {
        res.send([
            {
                title: 'iPhone 10',
                description: 'saksak',
                price: 1000,
                category: 'electronics',
            },
            {
                title: 'BMW',
                description: 'saksak',
                price: 10000,
                category: 'cars',
            },
        ]);
    });
};

module.exports = { init };
