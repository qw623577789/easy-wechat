const Base = require('../../base.js');
const Cache = require('../../../lib/cache');

module.exports = class extends Base {
    constructor(logger, config) {
        super(logger, config);
        this._cache = new Cache();
    }

    async accessToken() {
        let accessToken = this._cache.get('accessToken');
        if (accessToken == undefined) {
            let AccessToken = require('./accessToken.js');
            let instance = new AccessToken(this.logger, this.config);
            let { access_token: _accessToken } = await instance.get();
            this._cache.set('accessToken', _accessToken, 6500000);
            accessToken = _accessToken;
        }
        return accessToken;
    }
}