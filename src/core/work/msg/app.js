const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async textSend({
        toUserIds,
        toParty,
        toTag,
        text,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'text',
            text: {
                content: text
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async imageSend({
        toUserIds,
        toParty,
        toTag,
        mediaId,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'image',
            image: {
                media_id: mediaId
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async voiceSend({
        toUserIds,
        toParty,
        toTag,
        mediaId,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'voice',
            voice: {
                media_id: mediaId
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async videoSend({
        toUserIds,
        toParty,
        toTag,
        mediaId,
        title,
        description,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'video',
            video: {
                media_id: mediaId,
                title,
                description
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async fileSend({
        toUserIds,
        toParty,
        toTag,
        mediaId,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'music',
            file: {
                media_id: mediaId
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async textCardSend({
        toUserIds,
        toParty,
        toTag,
        title,
        description,
        url,
        buttonText,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'textcard',
            textcard: {
                title,
                description,
                url,
                btntxt: buttonText
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async outsideArticleSend({
        toUserIds,
        toParty,
        toTag,
        articles,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'news',
            news: {
                articles: articles.map(_ => (this.rmUndef({
                    title: _.title,
                    description: _.description,
                    url: _.url,
                    picurl: _.picUrl,
                    appid: _.appId,
                    pagepath: _.pagePath
                }))),
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async mpArticleSend({
        toUserIds,
        toParty,
        toTag,
        articles,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'mpnews',
            mpnews: {
                articles: articles.map(_ => (this.rmUndef({
                    title,
                    thumb_media_id: _.thumbMediaId,
                    author: _.author,
                    content_source_url: _.contentSourceUrl,
                    content: _.content,
                    digest: _.digest,
                    picurl: _.picUrl,
                    appid: _.appId,
                }))),
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async markdownSend({
        toUserIds,
        toParty,
        toTag,
        content,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'markdown',
            markdown: {
                content,
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async wxAppSend({
        toUserIds,
        toParty,
        toTag,
        wxAppId,
        title,
        wxAppPath,
        description,
        emphasisFirstItem,
        contentItem,
        safe = false,
        enableIdTrans = true,
        enableDuplicateCheck = false,
        duplicateCheckInterval = 1800,
    }) {
        let queryData = {
            touser: toUserIds ? toUserIds.join('|') : toUserIds,
            toparty: toParty ? toParty.join('|') : toParty,
            totag: toTag ? toTag.join('|') : toTag,
            msgtype: 'miniprogram_notice',
            miniprogram_notice: {
                title,
                appid: wxAppId,
                page: wxAppPath,
                description,
                emphasis_first_item: emphasisFirstItem,
                content_item: contentItem
            },
            safe: safe ? 1 : 0,
            enable_id_trans: enableIdTrans ? 1 : 0,
            enable_duplicate_check: enableDuplicateCheck ? 1 : 0,
            duplicate_check_interval: duplicateCheckInterval
        }

        await this._request(queryData);
    }

    async _request(queryData) {
        let accessToken = await this.config.context.work.accessToken();
        queryData.agentid = this.config.work.appId;
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`)
            .json(queryData)
            .execute();
        return this.commonResponseJsonParse(response);
    }
}