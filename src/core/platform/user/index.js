const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async infoGetByOAuthAccessToken({accessToken, openId}) {
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`)
                        .execute();
        response = this.commonResponseJsonParse(response);
        
        let output = {
            openId: response.openid,
            nickName: response.nickname,
            gender:  response.sex,
            province: response.province,
            city: response.city,
            country: response.country,
            avatarUrl: response.headimgurl
        }

        if (response.privilege != undefined) output.privilege = response.privilege;
        if (response.unionid != undefined) output.unionId = response.unionid;

        return output;
    }

    async infoGetByNormalAccessToken(openId){
        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.get
                        .url(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openId}&lang=zh_CN`)
                        .execute();
        response = this.commonResponseJsonParse(response);

        let output = {
            openId: response.openid,
            subscribe: response.subscribe
        }

        if (response.subscribe == 1) {
            output = Object.assign(output, {
                nickName: response.nickname,
                gender: response.sex,
                province: response.province,
                city: response.city,
                country: response.country,
                avatarUrl: response.headimgurl,
                subscribeTime: response.subscribe_time,
                subscribeScene: response.subscribe_scene,
            })

            if (response.unionid != undefined) output.unionId = response.unionid;
            if (response.qr_scene != undefined) output.qrScene = response.qr_scene;
            if (response.qr_scene_str != undefined) output.qrSceneStr = response.qr_scene_str;
            if (response.tagid_list != undefined) output.tagIdList = response.tagid_list;
            if (response.groupid != undefined) output.groupId = response.groupid;
            if (response.remark != undefined) output.remark = response.remark;
            if (response.language != undefined) output.language = response.language;
        }

        return output;
    }
}