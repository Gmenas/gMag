const fs = require('fs');

function init(data, initialDataFile) {
    const file = fs.readFileSync(initialDataFile, 'utf8');
    const initialData = JSON.parse(file);

    return new Promise((resolve) => {
        let p = Promise.resolve();
        Object.keys(initialData).forEach((collection) => {
            initialData[collection].forEach((i) => {
                p = p.then(() => data[collection].tryCreate(i));
            });
        });
        p.then(() => resolve(data));
    });
}

module.exports = { init };
