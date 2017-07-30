/* globals __dirname */
const path = require('path');
const fs = require('fs');

const configFilePath = './production.config.json';
const initialDataFilePath = './init.data.json';

let config = {};
if (fs.existsSync(configFilePath)) {
    config = JSON.parse(fs.readFileSync(configFilePath));
}

module.exports = {
    port: config.port || 80,
    connectionStr: config.connectionStr || 'mongodb://localhost/gmag',
    sessionSecret: config.sessionSecret || 'magic spoon',
    initialDataFile: path.join(__dirname, initialDataFilePath),
};
