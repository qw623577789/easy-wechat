const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }
    
    async push(openId, templateId, modelData, url = undefined, wxApp = undefined, color = undefined) {
        let queryData = {
            touser: openId,  
            template_id: templateId,
            miniprogram: wxApp,        
            url: url,     
            data: modelData,
            color: color
        }

        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`)
                        .json(queryData)
                        .execute();
        return this.commonResponseJsonParse(response);
    }

}