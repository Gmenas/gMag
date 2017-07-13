/* globals __dirname */
const fs = require('fs');
const path = require('path');

const init = (data) => {
    const file = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const initialData = JSON.parse(file);

    Object.keys(initialData).forEach((collection) => {
        initialData[collection].forEach((i) => {
            data[collection].create(i).catch(() => {});
        });
    });

    return Promise.resolve(data);
};

module.exports = { init };
