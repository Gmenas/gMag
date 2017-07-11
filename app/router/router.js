const attachTo = (app) => {
    app.get('/', (req, res) => {
        const context = { title: 'Home' };
        return res.render('home', context);
    });

    app.get('/browse', (req, res) => {
        const context = { title: 'Browse products' };
        return res.render('browse', context);
    });

    app.get('/login', (req, res) => {
        const context = { title: 'Login' };
        return res.render('login', context);
    });

    app.get('/register', (req, res) => {
        const context = { title: 'Register' };
        return res.render('register', context);
    });

    app.use((req, res) => {
        const context = {
            title: 'Not found',
            url: req.url.slice(1),
        };
        return res.render('not-found', context);
    });
};

module.exports = { attachTo };
