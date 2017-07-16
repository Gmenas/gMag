const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport/passport.cofig');

const init = (data) => {
    const app = express();
    passportConfig(app, data);
    app.set('view engine', 'pug');

    app.use(express.static('public'));
    app.use('/libs', express.static('node_modules'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(session({
        secret: 'secrettexthere',
        saveUninitialized: true,
        resave: true,
        name: 'cookie_name',
        // store: 'sessionStore', // connect-mongo session store
        proxy: true,
    }));

    app.get('/removeCookie', function(req, res) {
        res.clearCookie('27d');
        res.end('pruc');
    });

    require('./router').init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };