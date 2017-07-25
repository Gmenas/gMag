/* globals __dirname */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const authConfig = require('./auth');
const routers = require('./routers');

function init(data, sessionSecret) {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    app.use(express.static('public'));
    app.use('/libs', express.static('node_modules'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());

    authConfig.init(app, data, sessionSecret);

    routers.init(app, data);

    return Promise.resolve(app);
}

module.exports = { init };
