const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
        let Code = require('./code.js');
        let AccessToken = require('./accessToken.js');
        this._accessToken = new AccessToken(this.logger, this.config);
        this._code = new Code(this.logger, this.config);
    }

    get code() {
        return this._code;
    }

    get accessToken() {
        return this._accessToken;
    }
}