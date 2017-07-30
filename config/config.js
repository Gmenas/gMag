/* globals __dirname */
const path = require('path');
const fs = require('fs');

const configFilePath = path.join(__dirname, './production.config.json');
const initialDataFilePath = path.join(__dirname, './init.data.json');

let config = {};
if (fs.existsSync(configFilePath)) {
    config = JSON.parse(fs.readFileSync(configFilePath));
}

module.exports = {
    port: config.port || 80,
    connectionStr: config.connectionStr || 'mongodb://localhost/gmag',
    sessionSecret: config.sessionSecret || 'magic spoon',
    initialDataFile: initialDataFilePath,
};
