const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async infoGetByOauthAccessToken({accessToken, openId}) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`)
                        .execute();
        response = this.commonResponseJsonParse(response);
        
        let output = {
            openId: response.openid,
            nickName: response.nickname,
            gender:  response.sex,
            province: response.province,
            city: response.city,
            country: response.country,
            avatarUrl: response.headimgurl
        }

        if (response.privilege != undefined) output.privilege = response.privilege;
        if (response.unionid != undefined) output.unionId = response.unionid;

        return output;
    }
}