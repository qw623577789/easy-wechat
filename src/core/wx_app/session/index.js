const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get(code){
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.config.wxApp.appId}&secret=${this.config.wxApp.secret}&js_code=${code}&grant_type=authorization_code`)
                        .execute();
        response = this.commonResponseJsonParse(response);

        let output = {
            openId: response.openid,
            sessionKey: response.session_key
        }

        if (response.unionid != undefined) output.unionId = response.unionid;
        return output;
    }

}