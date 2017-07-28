const config = require('./test.config');

let testDb;
let testServer;

function start() {
    return Promise.resolve()
        .then(() => require('../../../db')
            .init(config.connectionStr))
        .then((db) => {
            testDb = db;
            testDb.dropDatabase();
            return require('../../../data').init(db);
        })
        .then((data) => require('../../../data/initial.data')
            .init(data, config.initialDataFile))
        .then((data) => require('../../../app')
            .init(data, config.sessionSecret))
        .then((app) => {
            testServer = app.listen(config.port, () =>
                console.log(`Server running at port ${config.port}...`)
            );
        })
        .catch(console.log);
}

function stop() {
    testServer.close();
    testDb.dropDatabase()
        .then(() => testDb.close());
}

module.exports = { start, stop };
