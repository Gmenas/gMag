const ObjectId = require('mongodb').ObjectID;

class BaseData {
    constructor(db, modelClass, collectionName) {
        this._modelClass = modelClass;
        this._collection = db.collection(collectionName);
    }

    create(model) {
        if (!this._modelClass.isValid(model)) {
            return Promise.reject(
                `Invalid ${this._modelClass.name}.`
            );
        }

        if (this._modelClass.toDbModel) {
            model = this._modelClass.toDbModel(model);
        }

        return this._collection
            .findOne(this._modelClass.equals(model))
            .then((exists) => {
                if (exists) {
                    return Promise.reject(
                        `${this._modelClass.name} already exists.`
                    );
                }

                return this._collection.insert(model)
                    .then((insertInfo) => {
                        const inserted = insertInfo.ops[0];
                        return Promise.resolve(inserted);
                    });
            });
    }

    get(filter, sort, limit) {
        filter = filter || {};
        sort = sort || {};
        limit = limit || 0;

        const result = this._collection
            .find(filter)
            .sort(sort)
            .limit(limit)
            .toArray();

        return result;
    }

    getById(id) {
        if (typeof id !== 'string' || !ObjectId.isValid(id)) {
            return Promise.reject(`Invalid ${this._modelClass.name} id.`);
        }

        const result = this._collection
            .findOne({ _id: new ObjectId(id) });

        return Promise.resolve(result);
    }
}

module.exports = BaseData;
