const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async textSend({
        toUserId,
        kfId,
        text,
        msgId,
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgtype: 'text',
            msgid: msgId,
            text: {
                content: text
            }
        })

        return await this._request(queryData);
    }

    async imageSend({
        toUserId,
        kfId,
        msgId,
        mediaId,
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'image',
            image: {
                media_id: mediaId
            }
        });

        return await this._request(queryData);
    }

    async voiceSend({
        toUserId,
        kfId,
        msgId,
        mediaId,
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'voice',
            voice: {
                media_id: mediaId
            }
        });

        return await this._request(queryData);
    }

    async videoSend({
        toUserId,
        kfId,
        msgId,
        mediaId
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'video',
            video: {
                media_id: mediaId
            }
        });

        return await this._request(queryData);
    }

    async fileSend({
        toUserId,
        kfId,
        msgId,
        mediaId
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'file',
            file: {
                media_id: mediaId
            }
        });

        return await this._request(queryData);
    }

    async linkSend({
        toUserId,
        kfId,
        msgId,
        title,
        description,
        url,
        thumbMediaId
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'link',
            link: this.rmUndef({
                title,
                desc: description,
                url,
                thumb_media_id: thumbMediaId
            }),
        });

        return await this._request(queryData);
    }

    async locationSend({
        toUserId,
        kfId,
        msgId,
        name,
        address,
        latitude,
        longitude,
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'location',
            location: this.rmUndef({
                name,
                address,
                latitude,
                longitude,
            })
        });

        return await this._request(queryData);
    }

    async menuSend({
        toUserId,
        kfId,
        msgId,
        head,
        list,
        tail
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'msgmenu',
            msgmenu: this.rmUndef({
                head_content: head,
                list: list.map(_ => this.rmUndef({
                    type: _.type,
                    click: _.click,
                    view: _.view,
                    miniprogram: _.miniProgram !== undefined ? {
                        appid: _.miniProgram.appId,
                        pagepath: _.miniProgram.pagePath,
                        content: _.miniProgram.content,
                    } : undefined,
                    text: _.text !== undefined ? {
                        content: _.text.content,
                        no_newline: _.text.noNewline
                    } : undefined
                })),
                tail_content: tail
            })
        });

        return await this._request(queryData);
    }

    async wxAppSend({
        toUserId,
        kfId,
        msgId,
        wxAppId,
        title,
        wxAppPath,
        thumbMediaId,
    }) {
        let queryData = this.rmUndef({
            touser: toUserId,
            open_kfid: kfId,
            msgid: msgId,
            msgtype: 'miniprogram',
            miniprogram: this.rmUndef({
                title,
                appid: wxAppId,
                pagepath: wxAppPath,
                thumb_media_id: thumbMediaId
            })
        });

        return await this._request(queryData);
    }

    async eventTextSend({ code, text, msgId }) {
        let queryData = this.rmUndef({
            code,
            msgtype: 'text',
            msgid: msgId,
            text: {
                content: text
            }
        });

        let accessToken = await this.config.context.work.csAccessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/kf/send_msg_on_event?access_token=${accessToken}`)
            .json(queryData)
            .execute();
        return this.commonResponseJsonParse(response).msgid;
    }

    async eventMenuSend({ code, msgId, head, list, tail }) {
        let queryData = this.rmUndef({
            code,
            msgid: msgId,
            msgtype: 'msgmenu',
            msgmenu: this.rmUndef({
                head_content: head,
                list: list.map(_ => this.rmUndef({
                    type: _.type,
                    click: _.click,
                    view: _.view,
                    miniprogram: _.miniProgram !== undefined ? {
                        appid: _.miniProgram.appId,
                        pagepath: _.miniProgram.pagePath,
                        content: _.miniProgram.content,
                    } : undefined,
                    text: _.text !== undefined ? {
                        content: _.text.content,
                        no_newline: _.text.noNewline
                    } : undefined
                })),
                tail_content: tail
            })
        });

        let accessToken = await this.config.context.work.csAccessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/kf/send_msg_on_event?access_token=${accessToken}`)
            .json(queryData)
            .execute();
        return this.commonResponseJsonParse(response).msgid;
    }

    async fetchMessage({ cursor, token, limit, voiceFormat, kfId }) {
        let accessToken = await this.config.context.work.csAccessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/kf/send_msg?access_token=${accessToken}`)
            .json(this.rmUndef({
                cursor, token, limit, voice_format: voiceFormat, open_kfid: kfId
            }))
            .execute();
        let { next_cursor, has_more, msg_list } = await this.commonResponseJsonParse(response);

        return {
            nextCursor: next_cursor,
            hasMore: has_more,
            list: msg_list.map(_ => {
                return this.rmUndef({
                    msgId: _.msgid,
                    kfId: _.open_kfid,
                    customerWechatUserId: _.external_userid,
                    sendTime: _.send_time,
                    origin: _.origin,
                    servicerUserId: _.servicer_userid,
                    msgType: _.msgtype,
                    text: this._toLowerCase(_.text),
                    image: this._toLowerCase(_.image),
                    voice: this._toLowerCase(_.voice),
                    video: this._toLowerCase(_.video),
                    file: this._toLowerCase(_.file),
                    location: this._toLowerCase(_.location),
                    businessCard: this._toLowerCase(_.business_card),
                    miniProgram: this._toLowerCase(_.miniprogram),
                    msgMenu: this._toLowerCase(_.msgmenu),
                    channelsShopProduct: this._toLowerCase(_.channels_shop_product),
                    channelsShopOrder: this._toLowerCase(_.channels_shop_order),
                    event: this._toLowerCase(_.event)
                })
            })
        }
    }

    _toLowerCase(value) {
        if (value === undefined || value === null) {
            return value;
        }
        else if (Array.isArray(value)) {
            return value.map(_ => this._toLowerCase(_));
        }
        else if (typeof value !== 'object') {
            return value;
        }
        else {
            return Object.entries(body)
                .reduce((prev, [iterKey, iterValue]) => {
                    prev[
                        iterKey.replace(/\_[a-z]{1}/g, (c) => c.substr(1).toUpperCase())
                    ] = this._toLowerCase(iterValue);
                    return prev;
                }, {})
        }
    }

    async _request(queryData) {
        let accessToken = await this.config.context.work.csAccessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/kf/sync_msg?access_token=${accessToken}`)
            .json(queryData)
            .execute();
        return this.commonResponseJsonParse(response).msgid;
    }
}