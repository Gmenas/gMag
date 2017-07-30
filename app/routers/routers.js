/* globals __dirname */
const fs = require('fs');
const path = require('path');

function _renderError(req, res, next) {
    res.renderError = (msg) => {
        const context = {
            title: 'Error',
            user: req.user,
            errorMsg: msg,
        };
        return res.render('error', context);
    };
    next();
}

function init(app, data) {
    app.use(_renderError);

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).init(app, data);
        });


    app.use((req, res) => {
        res
            .status(404)
            .renderError(
            `Page '${req.url.slice(1)}' not found.`
            );
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res
            .status(500)
            .renderError('Internal server error.');
    });
}

module.exports = { init };
