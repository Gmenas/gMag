class Category {
    static isValid(model) {
        return !!model &&
            typeof model.title === 'string' &&
            /^.{3,25}$/.test(model.title);
    }

    static toViewModel(model) {
        return {
            id: model._id,
            title: model.title,
            url: model.title
                .toLowerCase()
                .replace(/\s/g, '-'),
        };
    }

    static compareTo(model) {
        return { title: model.title };
    }
}

module.exports = Category;
