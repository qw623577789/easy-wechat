const Base = require('../../base.js');
const Cache = require('../../../lib/cache');

module.exports = class extends Base {
    constructor(logger, config) {
        super(logger, config);
        this._cache = new Cache();
    }

    async jsApiTicket() {
        let cache = this._cache.get('jsApiTicket');
        let accessToken = await this.accessToken();
        if (cache == undefined || cache.accessToken != accessToken) {
            let JsApiTicket = require('./jsApiTicket.js');
            let instance = new JsApiTicket(this.logger, this.config);
            let { ticket } = await instance.get(accessToken);
            this._cache.set('jsApiTicket', { accessToken, ticket }, 6500000);
            return ticket;
        }
        else {
            return cache.ticket;
        }
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