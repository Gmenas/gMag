const express = require('express');
const bodyParser = require('body-parser');

const init = (router, data) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(express.static('public'));
    app.use(bodyParser.json());

    require('./router').attachTo(app);

    return Promise.resolve(app);
};

module.exports = { init };
