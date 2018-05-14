const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async sendText(openId, text){
        let queryData = {
            touser: openId,  
            msgtype: "text",
            text: {
                content: text
            }
        }

        return await this._request(queryData);
    }

    async sendImage(openId, mediaId){
        let queryData = {
            touser: openId,  
            msgtype: "image",
            image: {
                media_id: mediaId
            }
        }

        return await this._request(queryData);
    }

    async sendLink(openId, title, description, url, thumbUrl){
        let queryData = {
            touser: openId,  
            msgtype: "link",
            link: {
                title: title,
                description: description,
                url: url,
                thumb_url: thumbUrl
            }
        }

        return await this._request(queryData);
    }

    async sendPage(openId, title, wxAppPath, thumbMediaId){
        let queryData = {
            touser: openId,  
            msgtype: "miniprogrampage",
            miniprogrampage: {
                title: title,
                pagepath: wxAppPath,
                url: url,
                thumb_media_id: thumbMediaId
            }
        }

        return await this._request(queryData);
    }

    async _request(queryData) {
        let accessToken = await this.config.context.wxApp.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`)
                        .json(queryData)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}