class Product {
    static isValid(model) {
        return !!model &&
            typeof model.title === 'string' &&
            /^.{3,25}$/.test(model.title) &&
            typeof model.description === 'string' &&
            /^.{5,500}$/.test(model.description) &&
            typeof model.price === 'number' &&
            model.price > 0 &&
            typeof model.category === 'object';
    }

    static equals(model) {
        return { title: model.title };
    }
}

module.exports = Product;
