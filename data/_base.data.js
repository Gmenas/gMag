const { ObjectId } = require('mongodb');

class BaseData {
    constructor(db, modelClass, collectionName) {
        this._modelClass = modelClass;
        this._collection = db.collection(collectionName);
    }

    create(model) {
        const errors = this._modelClass.validate(model);
        if (errors.length !== 0) {
            return Promise.reject(errors);
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
        if (!ObjectId.isValid(id)) {
            return Promise.reject(`Invalid ${this._modelClass.name} id.`);
        }

        return this._collection
            .findOne({ _id: new ObjectId(id) });
    }
}

module.exports = BaseData;
