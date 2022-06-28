const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get(secret) {
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this.config.work.corpId}&corpsecret=${secret}`)
            .execute();
        return this.commonResponseJsonParse(response);
    }
}