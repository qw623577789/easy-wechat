const request = require('skip-request')
const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get(code){
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.config.platform.appId}&secret=${this.config.platform.secret}&code=${code}&grant_type=authorization_code`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }

    async refresh(refreshToken) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${this.config.platform.appId}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }

    async check(accessToken, openId) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/auth?access_token=${accessToken}&openid=${openId}`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}