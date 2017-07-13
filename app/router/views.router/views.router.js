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
                const category = categories.find((x) => {
                    return x.url === req.params.category;
                });
                const context = {
                    title: `Browse ${category.title}`,
                    category: category,
                };
                return res.render('category-browse', context);
            });
    });

    app.get('/sell', (req, res) => {
        data.categories.find({}, { _id: 1 })
            .then((categories) => {
                const context = {
                    title: 'Sell',
                    categories: categories,
                };
                return res.render('sell', context);
            });
    });

    app.get('/details/:id', (req, res) => {
        data.products.findById(req.params.id)
            .then((product) => {
                const context = {
                    title: `Details for ${product.title}`,
                    product: product,
                };
                return res.render('details', context);
            })
            .catch((msg) => {
                const context = {
                    title: 'Error',
                    errorMsg: msg,
                };
                return res.render('error', context);
            });
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
