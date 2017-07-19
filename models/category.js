class Category {
    static validate(category) {
        const errors = [];

        if (!this._isValidType(category)) {
            errors.push('Invalid category type.');
            return errors;
        }

        if (!/^.{1,25}$/.test(category.title)) {
            errors.push('Title must be between 1 and 25 characters.');
        }

        return errors;
    }

    static _isValidType(category) {
        return !!category &&
            typeof category.title === 'string';
    }

    static toDbModel(model) {
        return {
            title: model.title,
            url: model.title
                .toLowerCase()
                .replace(/\s/g, '-'),
        };
    }

    static equals(model) {
        return { title: new RegExp(model.title, 'i') };
    }
}

module.exports = Category;
