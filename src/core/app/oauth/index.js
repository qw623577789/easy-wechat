const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
        let AccessToken = require('./accessToken.js');
        this._accessToken = new AccessToken(this.logger, this.config);
    }

    get accessToken() {
        return this._accessToken;
    }
}