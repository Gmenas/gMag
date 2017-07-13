const ObjectId = require('mongodb').ObjectID;

class BaseData {
    constructor(db, modelClass, collectionName) {
        this._modelClass = modelClass;
        this._collection = db.collection(collectionName);
    }

    create(model) {
        if (!this._modelClass.isValid(model)) {
            return Promise.reject(`Invalid ${this._modelClass.name}.`);
        }

        return this._collection
            .findOne(this._modelClass.compareTo(model))
            .then((exists) => {
                if (exists) {
                    return this._modelClass.toViewModel(exists);
                }

                return this._collection.insert(model)
                    .then((insertInfo) => {
                        const inserted = insertInfo.ops[0];
                        return this._modelClass.toViewModel(inserted);
                    });
            });
    }

    find(filter, sort) {
        filter = filter || {};
        sort = sort || {};

        const models = this._collection
            .find(filter)
            .sort(sort)
            .toArray()
            .then((dbItems) => {
                return dbItems.map((item) =>
                    this._modelClass.toViewModel(item));
            });
        return models;
    }

    findById(id) {
        if (typeof id !== 'string' || !ObjectId.isValid(id)) {
            return Promise.reject('Invalid id.');
        }

        return this._collection.findOne({ _id: new ObjectId(id) })
            .then((dbItem) => {
                return this._modelClass.toViewModel(dbItem);
            });
    }
}

module.exports = BaseData;
