const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async getForWxConfig(accessToken) {
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`)
            .execute();
        return this.commonResponseJsonParse(response);
    }

    async getForWxAgentConfig(accessToken) {
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=${accessToken}&type=agent_config`)
            .execute();
        return this.commonResponseJsonParse(response);
    }
}