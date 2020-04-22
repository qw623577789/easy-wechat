const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async textSend({openId, text, kfAccount = undefined}){
        let queryData = {
            touser: openId,  
            msgtype: "text",
            text: {
                content: text
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async imageSend({openId, mediaId, kfAccount = undefined}){
        let queryData = {
            touser: openId,  
            msgtype: "image",
            image: {
                media_id: mediaId
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async voiceSend({openId, mediaId, kfAccount = undefined}){
        let queryData = {
            touser: openId,  
            msgtype: "voice",
            voice: {
                media_id: mediaId
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async videoSend({openId, mediaId, thumbMediaId, title, description, kfAccount = undefined}){
        let queryData = {
            touser: openId,  
            msgtype: "video",
            video: {
                media_id: mediaId,
                thumb_media_id: thumbMediaId,
                title,
                description
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async musicSend({
        openId, 
        thumbMediaId, 
        title, 
        description,
        musicUrl,
        hqMusicUrl, 
        kfAccount = undefined
    }){
        let queryData = {
            touser: openId,  
            msgtype: "music",
            music: {
                thumb_media_id: thumbMediaId,
                title,
                description,
                musicurl: musicUrl,
                hqmusicurl: hqMusicUrl
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async outsideArticleSend({
        openId, 
        title, 
        description,
        url,
        picUrl, 
        kfAccount = undefined
    }){
        let queryData = {
            touser: openId,  
            msgtype: "news",
            news: {
                articles: [{
                    title,
                    description,
                    url,
                    picurl: picUrl
                }],
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async mpArticleSend({
        openId, 
        mediaId, 
        kfAccount = undefined
    }){
        let queryData = {
            touser: openId,  
            msgtype: "mpnews",
            mpnews: {
                media_id: mediaId
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async menuSend({
        openId, 
        head,
        list,
        tail, 
        kfAccount = undefined
    }){
        let queryData = {
            touser: openId,  
            msgtype: "msgmenu",
            msgmenu: {
                head_content: head,
                list,
                tail_content: tail
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )

        }

        await this._request(queryData);
    }

    async cardSend({
        openId, 
        cardId, 
        kfAccount = undefined
        
    }){
        let queryData = {
            touser: openId,  
            msgtype: "wxcard",
            wxcard: {
                card_id: cardId
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async wxAppSend({openId, wxAppId, title, wxAppPath, thumbMediaId, kfAccount = undefined}){
        let queryData = {
            touser: openId,  
            msgtype: "miniprogrampage",
            miniprogrampage: {
                title: title,
                appid: wxAppId,
                pagepath: wxAppPath,
                thumb_media_id: thumbMediaId
            },
            ...(
                kfAccount === undefined ? {} : {
                    customservice: {
                        kf_account: kfAccount
                    } 
                }
            )
        }

        await this._request(queryData);
    }

    async typingSet({openId, typing = true}) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=${accessToken}`)
                        .json({
                            touser: openId,  
                            command: typing ? 'Typing' : 'CancelTyping'
                        })
                        .execute();
        this.commonResponseJsonParse(response);
    }

    async _request(queryData) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
                        .url(`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`)
                        .json(queryData)
                        .execute();
        return this.commonResponseJsonParse(response);
    }
}