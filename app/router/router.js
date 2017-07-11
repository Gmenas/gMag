const attachTo = (app) => {
    app.get('/', (req, res) => {
        const context = {
            title: 'Home',
        };
        return res.render('home', context);
    });
};

module.exports = { attachTo };
