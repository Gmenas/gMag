function init(req, res) {
    const context = {
        title: 'Login',
        user: req.user,
        flash: req.flash(),
    };

    return res.render('login', context);
}

module.exports = { init };
