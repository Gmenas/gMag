const config = require('./config');

Promise.resolve()
    .then(() => require('./db').init())
    .then((db) => require('./data').init(db, config.connectionStr))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port,
            () => console.log(`Server running at ${config.port}...`));
    });
