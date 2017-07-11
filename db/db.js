const { MongoClient } = require('mongodb');

const init = (connectionStr) => {
    return MongoClient.connect(connectionStr);
};

module.exports = { init };
