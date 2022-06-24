const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async getByWxOpenId(openId) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_userid?access_token=${accessToken}`)
            .json({
                openid: openId
            })
            .execute();
        response = this.commonResponseJsonParse(response);

        return response.userid;
    }

    async getByMobile(mobile) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserid?access_token=${accessToken}`)
            .json({
                mobile
            })
            .execute();
        response = this.commonResponseJsonParse(response);

        return response.userid;
    }
}