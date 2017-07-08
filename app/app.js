const express = require('express');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        return res.render('home');
    });

    return Promise.resolve(app);
};

module.exports = { init };
