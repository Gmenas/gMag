/* globals __dirname */
const fs = require('fs');
const path = require('path');

const init = (data) => {
    const file = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    const initialData = JSON.parse(file);

    Object.keys(initialData).forEach((collection) => {
        initialData[collection].forEach((i) => {
            data[collection].create(i);
        });
    });

    const product = {
        title: 'TEST',
        description: 'mememe',
        price: 1000,
        category: 'Laptops',
    };

    let categoryId;
    let productId;
    data.categories.find({ title: product.category })
        .then((results) => {
            if (results.length === 0) {
                throw new Error('Category does not exist');
            }
            categoryId = results[0].id;
        })
        .then(() => {
            return data.products.create(product);
        })
        .then((productModel) => {
            productId = productModel.id;
        })
        .then(() => {
            data.categories.addProductToCategory(categoryId, productId);
        });


    return Promise.resolve(data);
};

module.exports = { init };
