class Category {
    static validate(category) {
        const errors = [];

        if (!this._isValidType(category)) {
            errors.push('Invalid category type.');
            return errors;
        }

        if (!/^.{3,25}$/.test(category.title)) {
            errors.push('Title must be between 3 and 25 characters.');
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
        return { title: model.title };
    }
}

module.exports = Category;
