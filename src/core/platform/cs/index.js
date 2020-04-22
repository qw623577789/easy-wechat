const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async list() {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
            .url(`https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=${accessToken}`)
            .execute();
            let {kf_list: list} = this.commonResponseJsonParse(response);
        
        return list.map(_ => {
            return this.rmUndef({
                account: _.kf_account,
                avatar: _.kf_headimgurl,
                id: _.kf_id,
                wx: _.kf_wx,
                nickname: _.kf_nick,
                inviteWx: _.invite_wx,
                inviteExpireTime: _.invite_expire_time,
                inviteStatus: _.invite_status,
            })
        })
    }

    async add({account, nickname}) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/customservice/kfaccount/add?access_token=${accessToken}`)
            .json({
                kf_account: account,
                nickname
            })
            .execute();
        this.commonResponseJsonParse(response);
    }

    async bind({account, inviteWx}) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/customservice/kfaccount/inviteworker?access_token=${accessToken}`)
            .json({
                kf_account: account,
                invite_wx: inviteWx
            })
            .execute();
        this.commonResponseJsonParse(response);
    }

    async nicknameUpdate({account, nickname}) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/customservice/kfaccount/update?access_token=${accessToken}`)
            .json({
                kf_account: account,
                nickname
            })
            .execute();
        this.commonResponseJsonParse(response);
    }

    async avatarUpdate({account, imgBase64, filename = "default.jpg"}) {
        let accessToken = await this.config.context.platform.accessToken();
        const imgBuf = Buffer.from(imgBase64, 'base64');
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=${accessToken}&kf_account=${account}`)
            .mutilForm({
                media: { 
                    value: imgBuf, 
                    options: { 
                        filename,
                    } 
                } 
            })
            .execute();
        this.commonResponseJsonParse(response);
    }

    async delete({account}) {
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
            .url(`https://api.weixin.qq.com/customservice/kfaccount/del?access_token=${accessToken}&kf_account=${account}`)
            .execute();
        this.commonResponseJsonParse(response);
    }
}