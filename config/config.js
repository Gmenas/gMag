/* globals __dirname */
const path = require('path');

module.exports = {
    port: 80,
    connectionStr: 'mongodb://localhost/gmag',
    sessionSecret: 'magic spoon',
    initialDataFile: path.join(__dirname, './init.data.json'),
};
