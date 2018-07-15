const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async push({openId, templateId, formId, modelData, emphasisKeyword = undefined, wxAppPagePath = undefined, color = undefined}){
        let queryData = {
            touser: openId,  
            template_id: templateId,
            page: wxAppPagePath,        
            form_id: formId,     
            data: modelData,
            color: color,
            emphasis_keyword: emphasisKeyword
        }

        let accessToken = await this.config.context.wxApp.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${accessToken}`)
                        .json(queryData)
                        .execute();
        this.commonResponseJsonParse(response);
    }

}