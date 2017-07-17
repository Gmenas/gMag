const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const passportConfig = require('./auth/passport.config');
const router = require('./router');

const init = (data, sessionSecret) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(express.static('public'));
    app.use('/libs', express.static('node_modules'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());

    passportConfig.init(app, data, sessionSecret);
    router.init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
