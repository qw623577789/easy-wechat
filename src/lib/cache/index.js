module.exports = class {
    constructor() {
        this._cache = new Map();
    }

    get(key) {
        let cache = this._cache.get(key);
        if (cache == undefined) return undefined;
        if (cache.age <= Date.now()) {
            this._cache.delete(key);
            return undefined;
        }
        return cache.value;
    }

    set(key, value, age = -1) {
        this._cache.set(key, {value, age: Date.now() + age});
    }

    remove(key) {
        this._cache.delete(key);
    }
}