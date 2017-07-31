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

        if (this._modelClass.equals) {
            return this.getOne(this._modelClass.equals(model))
                .then((exists) => {
                    if (exists) {
                        return Promise.reject(
                            `${this._modelClass.name} already exists.`
                        );
                    }

                    return this._insert(model);
                });
        }
        return this._insert(model);
    }

    tryCreate(model) {
        return new Promise((res, rej) => {
            return this.create(model)
                .then(() => res(true))
                .catch(() => res(false));
        });
    }

    _insert(model) {
        return this._collection.insert(model)
            .then((insertInfo) => {
                const inserted = insertInfo.ops[0];
                return Promise.resolve(inserted);
            });
    }

    get(filter, sort, limit, skip) {
        filter = filter || {};
        filter.isDeleted = { $ne: true };

        sort = sort || {};
        limit = limit || 0;
        skip = skip || 0;

        return this._collection
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    getOne(filter) {
        filter = filter || {};
        filter.isDeleted = { $ne: true };
        return this._collection.findOne(filter);
    }

    getById(id) {
        if (!ObjectId.isValid(id)) {
            return Promise.reject(`Invalid ${this._modelClass.name} id.`);
        }
        // eslint-disable-next-line new-cap
        return this.getOne({ _id: ObjectId(id) });
    }

    deleteOne(filter) {
        filter = filter || {};
        return this._collection.update(filter, { $set: { isDeleted: true } });
    }
}

module.exports = BaseData;

