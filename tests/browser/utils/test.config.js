/* globals __dirname */
const path = require('path');

module.exports = {
    port: 3000,
    connectionStr: 'mongodb://localhost/gmag-test',
    sessionSecret: 'magic spoon',
    initialDataFile: path.join(__dirname, './../../../config/init.data.json'),
};
