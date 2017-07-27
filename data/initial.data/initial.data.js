const fs = require('fs');

function init(data, initialDataFile) {
    const file = fs.readFileSync(initialDataFile, 'utf8');
    const initialData = JSON.parse(file);
    const toBeCreated = [];

    return new Promise((resolve, reject) => {
        Object.keys(initialData).forEach((collection) => {
            initialData[collection].forEach((i) => {
                toBeCreated.push(data[collection].create(i));
            });
        });
        Promise.all(toBeCreated.map((p) => p.catch((e) => e)))
            .then((created) => {
                resolve(data);
            })
            .catch(reject);
    });
}

module.exports = { init };
