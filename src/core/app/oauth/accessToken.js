const request = require('skip-request')
const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get(code){
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.config.app.appId}&secret=${this.config.app.secret}&code=${code}&grant_type=authorization_code`)
                        .execute();
        response = this.commonResponseJsonParse(response);
        let output = {
            accessToken: response.access_token,
            expiresIn: response.expires_in,
            refreshToken: response.refresh_token,
            openId: response.openid,
            scope: response.scope,
        }

        if (response.unionid != undefined) output.unionId = response.unionid;
        return output;
    }

    async refresh(refreshToken) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${this.config.app.appId}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                        .execute();
        response = this.commonResponseJsonParse(response);
        let output = {
            accessToken: response.access_token,
            expiresIn: response.expires_in,
            refreshToken: response.refresh_token,
            openId: response.openid,
            scope: response.scope,
        }

        if (response.unionid != undefined) output.unionId = response.unionid;
        return output;
    }

    async check({accessToken, openId}) {
        try {
            let response = await this.request.get
                .url(`https://api.weixin.qq.com/sns/auth?access_token=${accessToken}&openid=${openId}`)
                .execute();
            this.commonResponseJsonParse(response);
            return true;
        }
        catch(error) {
            return false;
        }
    }
}