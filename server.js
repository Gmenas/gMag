const config = require('./config');

Promise.resolve()
    .then(() => require('./db')
        .init(config.connectionStr))
    .then((db) => require('./data')
        .init(db))
    .then((data) => require('./data/initial.data')
        .init(data, config.initialDataFile))
    .then((data) => require('./app')
        .init(data, config.sessionSecret))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Server running at port ${config.port}...`)
        );
    })
    .catch(console.log);
