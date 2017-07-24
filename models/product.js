class Product {
    static validate(product) {
        const errors = [];

        if (!this._isValidType(product)) {
            errors.push('Invalid product type.');
            return errors;
        }

        if (!/^.{3,50}$/.test(product.title)) {
            errors.push('Title must be between 3 and 50 characters.');
        }

        if (!/^.{5,1000}$/.test(product.description)) {
            errors.push('Description must be between 5 and 1000 characters.');
        }

        if (product.price <= 0) {
            errors.push('Price must be more than zero.');
        }

        if (product.price > 5000) {
            errors.push('We don\'t sell such expensive products.');
        }

        return errors;
    }

    static _isValidType(product) {
        return !!product &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.price === 'number' &&
            typeof product.categoryId === 'object' &&
            typeof product.sellerId === 'object';
    }

    static toDbModel(product) {
        return {
            title: product.title,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            sellerId: product.sellerId,
        };
    }

    static equals(product) {
        return { title: product.title };
    }
}

module.exports = Product;
