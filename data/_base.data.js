class BaseData {
    constructor(db, modelClass, collectionName) {
        this._modelClass = modelClass;
        this._collection = db.collection(collectionName);
    }

    create(model) {
        if (!this._modelClass.isValid(model)) {
            return Promise.reject('Invalid model.');
        }

        const viewModel = this._collection.insert(model)
            .then((insertInfo) => {
                const inserted = insertInfo.ops[0];
                return this._modelClass.toViewModel(inserted);
            });
        return viewModel;
    }

    find(filter, options) {
        filter = filter || {};
        options = options || {};
        const dbResult = this._collection
            .find(filter, options)
            .sort({ _id: 1 })
            .toArray();

        const all = dbResult
            .then((models) => {
                return models.map((model) =>
                    this._modelClass.toViewModel(model));
            });
        return all;
    }
}

module.exports = BaseData;
