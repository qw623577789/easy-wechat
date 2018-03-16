const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async get(accessToken) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}