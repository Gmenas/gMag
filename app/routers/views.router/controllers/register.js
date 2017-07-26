function init(req, res) {
    const context = {
        title: 'Register',
        user: req.user,
        flash: req.flash(),
    };

    return Promise.resolve(
        res.render('register', context)
    );
}

module.exports = { init };
