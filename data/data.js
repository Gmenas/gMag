const init = (db) => {
    // testing data
    // will move in db later
    class Category {
        constructor(title) {
            this.title = title;
            this.url = title
                .toLowerCase()
                .replace(/\s/g, '-');
        }
    }
    const categories = [
        'Laptops',
        'Phones and Tables',
        'Cameras',
        'TVs',
        'Fashion',
        'Books',
        'Sport',
    ].map((x) => new Category(x));

    return Promise.resolve({
        categories: categories,
    });
};

module.exports = { init };
