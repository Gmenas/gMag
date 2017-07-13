const utils = require('./../../utils');

const init = (app, data) => {
    app.get('/', (req, res) => {
        Promise.all([
            data.categories.getAll(),
            data.products.getRecent(3),
        ])
            .then(([categories, products]) => {
                const context = {
                    title: 'Home',
                    categories: categories,
                    recent: products,
                };
                return res.render('home', context);
            });
    });

    app.get('/browse', (req, res) => {
        const categoriesWithProducts = [];
        data
            .categories.getAll()
            .then((categories) => {
                categories.forEach((c) => {
                    c.products = data.products.getByCategoryId(c._id, 3);
                    categoriesWithProducts.push(c);
                });
                Promise
                    .all(categories.map((x) => x.products))
                    .then((groupedProducts) => {
                        groupedProducts.forEach((x, i) => {
                            categoriesWithProducts[i].products = x;
                        });
                        const context = {
                            title: 'Categories',
                            categories: categoriesWithProducts,
                        };
                        return res.render('browse-categories', context);
                    });
            });
    });

    app.get('/browse/:category', (req, res) => {
        data
            .categories.getByUrl(req.params.category)
            .then((category) => {
                const categoryId = category._id;
                data
                    .products
                    .getByCategoryId(categoryId)
                    .then((products) => {
                        const context = {
                            title: `Browse ${category.title}`,
                            category: category,
                            products: products,
                        };

                        return res.render('browse-category', context);
                    });
            })
            .catch((msg) => utils.displayError(msg, res));
    });

    app.get('/sell', (req, res) => {
        data
            .categories.getAll()
            .then((categories) => {
                const context = {
                    title: 'Sell',
                    categories: categories,
                };
                return res.render('sell', context);
            });
    });

    app.get('/product/:id', (req, res) => {
        data
            .products.getById(req.params.id)
            .then((product) => {
                const context = {
                    title: `Details for ${product.title}`,
                    product: product,
                };
                return res.render('product', context);
            })
            .catch((msg) => utils.displayError(msg, res));
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
