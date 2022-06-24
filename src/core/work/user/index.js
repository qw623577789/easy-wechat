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
}