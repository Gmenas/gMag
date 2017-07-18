class SessionData {
    constructor(db) {
        this._db = db;
    }

    getMongoStore(session) {
        const MongoStore = require('connect-mongo')(session);
        return new MongoStore({ db: this._db });
    }
}

module.exports = SessionData;
