const init = (app, data) => {
    app.get('/', (req, res) => {
        data.categories.find({}, { _id: 1 })
            .then((categories) => {
                const context = {
                    title: 'Home',
                    categories: categories,
                };
                return res.render('home', context);
            });
    });

    app.get('/browse', (req, res) => {
        data.categories.find({}, { _id: 1 })
            .then((categories) => {
                const context = {
                    title: 'Categories',
                    categories: categories,
                };
                return res.render('categories-list', context);
            });
    });

    app.get('/browse/:category', (req, res) => {
        data.categories.find({}, { _id: 1 })
            .then((categories) => {
                const context = {
                    title: 'Browse products',
                    category: categories.find(
                        (x) => x.url === req.params.category
                    ),
                };
                return res.render('category-browse', context);
            });
    });

    app.get('/sell', (req, res) => {
        const context = { title: 'Sell' };
        return res.render('sell', context);
    });

    app.get('/details/:id/', (req, res) => {
        const context = {
            title: `Details for ${req.params.id}`,
            id: req.params.id,
        };
        return res.render('details', context);
    });

    app.get('/login', (req, res) => {
        const context = { title: 'Login' };
        return res.render('login', context);
    });

    app.get('/register', (req, res) => {
        const context = { title: 'Register' };
        return res.render('register', context);
    });
};

module.exports = { init };
