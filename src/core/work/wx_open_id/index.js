const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async getByUserId(userId) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=${accessToken}`)
            .json({
                userid: userId
            })
            .execute();
        response = this.commonResponseJsonParse(response);

        return response.openid;
    }
}