const init = (req, res) => {
    const context = {
        title: 'Register',
        user: req.user,
        flash: req.flash(),
    };

    return res.render('register', context);
};

module.exports = { init };
