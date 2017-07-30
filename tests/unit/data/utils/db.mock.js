function getDbMock(items) {
    return {
        collection: () => {
            return {
                find: () => new class {
                    sort() {
                        return this;
                    }
                    skip() {
                        return this;
                    }
                    limit() {
                        return this;
                    }
                    toArray() {
                        return Promise.resolve(items);
                    }
                },
            };
        },
    };
}

module.exports = { getDbMock };
