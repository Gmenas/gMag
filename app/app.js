const express = require('express');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(express.static('public'));
    app.use('/libs', express.static('node_modules'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./router').init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
