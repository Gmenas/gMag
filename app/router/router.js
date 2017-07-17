/* globals __dirname */
const fs = require('fs');
const path = require('path');

const utils = require('./../utils');

const init = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).init(app, data);
        });

    app.use((req, res) => {
        utils.showErrorPage(
            `Page '${req.url.slice(1)}' not found.`,
            res
        );
    });
};

module.exports = { init };
