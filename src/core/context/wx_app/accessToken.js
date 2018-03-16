const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get() {
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.config.wxApp.appId}&secret=${this.config.wxApp.secret}`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}