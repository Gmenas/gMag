const { MongoClient } = require('mongodb');

function init(connectionStr) {
    return MongoClient.connect(connectionStr);
}

module.exports = { init };
