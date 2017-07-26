function init(req, res) {
    const context = {
        title: 'Login',
        user: req.user,
        flash: req.flash(),
    };

    return Promise.resolve(
        res.render('login', context)
    );
}

module.exports = { init };
