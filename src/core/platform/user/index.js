const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async infoGetByOAuthAccessToken(accessToken, openId) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }

    async infoGetByNormalAccessToken(openId){
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openId}&lang=zh_CN`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}