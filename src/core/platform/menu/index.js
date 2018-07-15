const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }
     
    async get() {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }

    async set(menuJson) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`)
                        .json(menuJson)
                        .execute();
        this.commonResponseJsonParse(response);
    }

    async delete() {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${accessToken}`)
                        .execute();
        this.commonResponseJsonParse(response);
    }
}