const CommonPayment = require('./common.js');
const Base = require('../base.js');
module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async create({
        orderId,
        sceneId,
        openId,
        receiverName = undefined,
        money,
        remark,
        notifyUrl = undefined,
        receivePerception = undefined,
        reportInfos
    }) {
        let requestJson = this.rmUndef({
            appid: this.config.payment.appId,
            out_bill_no: orderId,
            transfer_scene_id: sceneId,
            openid: openId,
            user_name: receiverName,
            transfer_amount: money,
            transfer_remark: remark,
            notify_url: notifyUrl,
            user_recv_perception: receivePerception,
            transfer_scene_report_infos: reportInfos.map(_ => ({
                info_type: _.infoType,
                info_content: _.infoContent
            }))
        });

        let common = new CommonPayment(this.logger, this.config);

        let response = await this.request.post
            .url('https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills')
            .header({
                'Accept': 'application/json',
                'Wechatpay-Serial': this.config.payment.wechatPaySerial,
                'Authorization': common.v3SignGet('POST', '/v3/fund-app/mch-transfer/transfer-bills', requestJson),
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            })
            .json(requestJson)
            .execute();

        response = response.toJson();

        if (response.code !== undefined) {
            throw new Error(response.message);
        }

        let output = this.rmUndef({
            outBillNo: response.out_bill_no,
            transferBillNo: response.transfer_bill_no,
            createTime: response.create_time,
            state: response.state,
            failReason: response.fail_reason,
            packageInfo: response.package_info,
            mchId: this.config.payment.mchId,
            appId: this.config.payment.appId,
        });

        return output;
    }

    async cancel(orderId) {

        let common = new CommonPayment(this.logger, this.config);

        let response = await this.request.post
            .url(`https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${orderId}/cancel`)
            .header({
                'Accept': 'application/json',
                'Authorization': common.v3SignGet('POST', `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${orderId}/cancel`, {}),
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            })
            .json({})
            .execute();

        response = response.toJson();

        if (response.code !== undefined) {
            throw new Error(response.message);
        }

        let output = {
            outBillNo: response.out_bill_no,
            transferBillNo: response.transfer_bill_no,
            updateTime: response.update_time,
            state: response.state
        }

        return output;
    }

    async getByOrderId(orderId) {

        let common = new CommonPayment(this.logger, this.config);

        let response = await this.request.get
            .url(`https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${orderId}`)
            .header({
                'Accept': 'application/json',
                'Authorization': common.v3SignGet('GET', `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${orderId}`),
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            })
            .execute();

        response = response.toJson();

        if (response.code !== undefined) {
            throw new Error(response.message);
        }

        let output = this.rmUndef({
            mchId: response.mch_id,
            outBillNo: response.out_bill_no,
            transferBillNo: response.transfer_bill_no,
            appId: response.appid,
            updateTime: response.update_time,
            state: response.state,
            money: response.transfer_amount,
            remark: response.transfer_remark,
            failReason: response.fail_reason,
            openId: response.openid,
            receiverName: response.user_name,
            createTime: response.create_time,
        });

        return output;

    }

    async getByWechatOrderId(wechatOrderId) {

        let common = new CommonPayment(this.logger, this.config);

        let response = await this.request.get
            .url(`https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${wechatOrderId}`)
            .header({
                'Accept': 'application/json',
                'Authorization': common.v3SignGet('GET', `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${wechatOrderId}`),
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            })
            .execute();

        response = response.toJson();

        if (response.code !== undefined) {
            throw new Error(response.message);
        }

        let output = this.rmUndef({
            mchId: response.mch_id,
            outBillNo: response.out_bill_no,
            transferBillNo: response.transfer_bill_no,
            appId: response.appid,
            updateTime: response.update_time,
            state: response.state,
            money: response.transfer_amount,
            remark: response.transfer_remark,
            failReason: response.fail_reason,
            openId: response.openid,
            receiverName: response.user_name,
            createTime: response.create_time,
        });

        return output;

    }

}