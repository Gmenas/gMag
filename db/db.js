const mongo = require('mongodb');
const grid = require('gridfs-stream');

function init(connectionStr) {
    return new Promise((resolve, reject) => {
        mongo.MongoClient.connect(connectionStr)
            .then((db) => {
                const gfs = grid(db, mongo);
                resolve({
                    db: db,
                    gfs: gfs,
                });
            })
            .catch(reject);
    });
}

module.exports = { init };
