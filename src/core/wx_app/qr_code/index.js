const Base = require('../../base.js');
const assert = require('assert');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async getBQRCode(scene, pagePath, width=430, autoColor=false, lineColor={r:0, g:0, b:0}) {
        let accessToken = await this.config.context.wxApp.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`)
                        .json({
                            scene, path: pagePath, width, auto_color: autoColor, line_color: lineColor
                        })
                        .execute();

        assert(response.status == 200, "error response status");
        if (response.headers['content-type'].indexOf('application/json') != -1) {
            let jsonBody = response.toJson();
            throw new Error(jsonBody.errmsg);
        }
        
        return response.toBuffer();
    }

    async getAQRCode(pagePath, width=430, autoColor=false, lineColor={r:0, g:0, b:0}) {
        let accessToken = await this.config.context.wxApp.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`)
                        .json({
                            path: pagePath, width, auto_color: autoColor, line_color: lineColor
                        })
                        .execute();
        assert(response.status == 200, "error response status");
        if (response.headers['content-type'].indexOf('application/json') != -1) {
            let jsonBody = response.toJson();
            throw new Error(jsonBody.errmsg);
        }
        
        return response.toBuffer();
    }
}