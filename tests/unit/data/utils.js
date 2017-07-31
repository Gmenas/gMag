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

function getSuper(instance) {
    return Object.getPrototypeOf(Object.getPrototypeOf(instance));
}

module.exports = { getDbMock, getSuper };
