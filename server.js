const config = require('./config');

Promise.resolve()
    .then(() => require('./db').init(config.connectionStr))
    .then((db) => require('./data').init(db))
    .then((data) => require('./data/initial.data').init(data))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port,
            () => console.log(`Server running at ${config.port}...`));
    });
