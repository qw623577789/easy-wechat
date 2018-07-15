const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async textSend({openId, text}){
        let queryData = {
            touser: openId,  
            msgtype: "text",
            text: {
                content: text
            }
        }

        await this._request(queryData);
    }

    async imageSend({openId, mediaId}){
        let queryData = {
            touser: openId,  
            msgtype: "image",
            image: {
                media_id: mediaId
            }
        }

        await this._request(queryData);
    }

    async linkSend({openId, title, description, url, thumbUrl}){
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

        await this._request(queryData);
    }

    async pageSend({openId, title, wxAppPath, thumbMediaId}){
        let queryData = {
            touser: openId,  
            msgtype: "miniprogrampage",
            miniprogrampage: {
                title: title,
                pagepath: wxAppPath,
                thumb_media_id: thumbMediaId
            }
        }

        await this._request(queryData);
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