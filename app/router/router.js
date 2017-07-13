/* globals __dirname */
const fs = require('fs');
const path = require('path');

const init = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).init(app, data);
        });

    app.use((req, res) => {
        const context = {
            title: 'Not found',
            errorMsg: `Page <b>${req.url.slice(1)} not found.`,
        };
        return res.render('error', context);
    });
};

module.exports = { init };
