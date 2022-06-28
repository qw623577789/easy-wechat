const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async infoGetByCode(code) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${accessToken}&code=${code}`)
            .execute();
        response = this.commonResponseJsonParse(response);

        return this.rmUndef({
            userId: response.UserId,
            deviceId: response.DeviceId,
            authUserTicket: response.user_ticket,
            openId: response.OpenId,
            enterpriseCustomerUserId: response.external_userid,
        });
    }

    async infoGetByAuthUserTicket(authUserTicket) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?access_token=${accessToken}`)
            .json({
                user_ticket: authUserTicket
            })
            .execute();
        response = this.commonResponseJsonParse(response);

        return this.rmUndef({
            userId: response.userid,
            gender: response.gender,
            avatar: response.avatar,
            qrCode: response.qr_code,
            mobile: response.mobile,
            email: response.email,
            bizEmail: response.biz_mail,
            address: response.address
        })
    }

    async infoGetByUserId(userId) {
        let accessToken = await this.config.context.work.accessToken();
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&userid=${userId}`)
            .execute();
        response = this.commonResponseJsonParse(response);

        return this.rmUndef({
            userId: response.userid,
            status: response.status,
            qrCode: response.qr_code,
            name: response.name,
            unionUserId: response.open_userid,
            mobile: response.mobile,
            department: response.department,
            order: response.order,
            position: response.position,
            gender: response.gender,
            email: response.email,
            bizEmail: response.biz_mail,
            isLeaderInDept: response.is_leader_in_dept,
            directLeaderUserId: response.direct_leader,
            avatar: response.avatar,
            thumbAvatar: response.thumb_avatar,
            telephone: response.telephone,
            alias: response.alias,
            avatar: response.avatar,
            address: response.address,
            mainDepartment: response.main_department,
            externalProfile: response.external_profile,
            externalPosition: response.external_position,
            extAttr: response.extattr,
        });
    }

    async enterpriseCustomerInfoGetByEnterpriseCustomerUserId(enterpriseCustomerUserId) {
        let accessToken = await this.config.context.work.addressBookAccessToken();
        let response = await this.request.get
            .url(`https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get?access_token=${accessToken}&external_userid=${enterpriseCustomerUserId}`)
            .execute();
        response = this.commonResponseJsonParse(response);

        return this.rmUndef({
            enterpriseCustomerUserId: response.external_contact.external_userid,
            name: response.external_contact.name,
            position: response.external_contact.position,
            avatar: response.external_contact.avatar,
            corpName: response.external_contact.corp_name,
            corpFullName: response.external_contact.corp_full_name,
            type: response.external_contact.type,
            gender: response.external_contact.gender,
            wechatUnionId: response.external_contact.unionid,
            externalProfile: response.external_profile,
            followUser: response.follow_user.map(_ => {
                return this.rmUndef({
                    userId: _.userid,
                    remark: _.remark,
                    description: _.description,
                    createTime: _.createtime,
                    tags: _.tags.map(__ => {
                        return this.rmUndef({
                            groupName: __.group_name,
                            tagName: __.tag_name,
                            type: __.type
                        })
                    }),
                    remarkCorpName: _.remark_corp_name,
                    remarkMobiles: _.remark_mobiles,
                    operUserId: _.oper_userid,
                    addWay: _.add_way,
                    wechatChannels: _.wechat_channels === undefined ? undefined : {
                        nickname: _.wechat_channels.nickname,
                        source: _.wechat_channels.source,
                    }
                })
            }),
            nextCursor: response.next_cursor
        });
    }
}