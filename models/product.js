class Product {
    static validate(product) {
        const errors = [];

        if (!this._isValidType(product)) {
            errors.push('Invalid product type.');
            return errors;
        }

        if (!/^.{3,25}$/.test(product.title)) {
            errors.push('Title must be between 3 and 25 characters.');
        }

        if (!/^.{5,500}$/.test(product.description)) {
            errors.push('Description must be between 5 and 500 characters.');
        }

        if (product.price <= 0) {
            errors.push('Price must be positive.');
        }

        return errors;
    }

    static _isValidType(product) {
        return !!product &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.price === 'number' &&
            typeof product.category === 'object';
    }

    static equals(product) {
        return { title: product.title };
    }
}

module.exports = Product;
