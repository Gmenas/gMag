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

function getSuperInstance(instance) {
    return Object.getPrototypeOf(Object.getPrototypeOf(instance));
}

module.exports = { getDbMock, getSuperInstance };
