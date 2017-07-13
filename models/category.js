class Category {
    static isValid(model) {
        return !!model &&
            typeof model.title === 'string' &&
            /^.{3,25}$/.test(model.title);
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
