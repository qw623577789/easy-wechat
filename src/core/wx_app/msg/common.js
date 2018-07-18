const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async textSecurityCheck(text){
        let accessToken = await this.config.context.wxApp.accessToken();
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`)
            .json({
                content: text 
            })
            .execute();

        try {
            this.commonResponseJsonParse(response);
            return true;
        }
        catch(error) {
            return false;
        }
    }
}