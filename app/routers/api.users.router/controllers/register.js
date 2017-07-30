function init(req, res, data) {
    const formData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    data
        .users.create(formData)
        .then((user) => {
            req.flash('info',
                'Succesfully registered.'
            );
            req.login(user, (err) => {
                res.redirect('/');
            });
        })
        .catch((errors) => {
            req.flash('error', errors);
            res.redirect('/register');
        });
}

module.exports = { init };
