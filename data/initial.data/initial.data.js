const fs = require('fs');

function init(data, initialDataFile) {
    const file = fs.readFileSync(initialDataFile, 'utf8');
    const initialData = JSON.parse(file);

    Object.keys(initialData).forEach((collection) => {
        let p = Promise.resolve();
        initialData[collection].forEach((i) => {
            p = p.then(() => data[collection].tryCreate(i));
        });
        return p;
    });

    return Promise.resolve(data);
}

module.exports = { init };
