const dateFormat = require('dateformat');
const constant = require('../../constant');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const Xml = require('xml');
const CommonPayment = require('./common.js');
const Base = require('../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async normalSend({orderId, senderName, receiverOpenId, money, wishing, activityName, remark, spbillCreateIp = '127.0.0.1', sceneId = undefined,  riskInfo = undefined, consumeMchId = undefined, signType = "MD5"}){
        let nonceStr = uuid().replace(/-/g, '');
        let requestJson = {
            wxappid:  this.config.payment.appId,
            send_name:  senderName,
            re_openid: receiverOpenId,
            mch_id: this.config.payment.mchId,
            act_name: activityName,
            nonce_str: nonceStr,
            mch_billno: orderId,
            client_ip: spbillCreateIp,
            total_amount: money,
            total_num: 1,
            wishing: wishing,
            remark: remark
        }
        
        if(money > 200 || money < 1){
            if (sceneId == undefined) throw new Error('sceneId is needed when money > 200 or money < 1');
            requestJson.scene_id = sceneId;
        }

        if(riskInfo != undefined){
            requestJson.risk_info = riskInfo;
        }

        if(consumeMchId != undefined){
            requestJson.consume_mch_id = consumeMchId;
        }

        let common = new CommonPayment(this.logger, this.config);
        requestJson.sign = common.signGet({data: requestJson, signType});

        let xml = Object.keys(requestJson).map(key => {
            let item = {};
            item[key] = requestJson[key];
            return item;
        })
        let requestText = Xml([{xml}]);

        let response = await this.request.post
                        .url('https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack')
                        .ca({pfxFilePath: this.config.payment.pfxFile}, this.config.payment.mchId)
                        .xml(requestText)
                        .execute();
        
        response = this.paymentResponseJsonParse(response).xml;

        let output = {
            sign: response.sign,
            resultCode: response.result_code,
            errCode: response.err_code,
            errCodeDes: response.err_code_des
        }

        if (response.result_code == 'SUCCESS') {
            output = Object.assign(output, {
                orderId: response.mch_billno,
                mchId: response.mch_id,
                appId: response.wxappid,
                receiveOpenId: response.re_openid,
                money: response.total_amount,
                redPacketId: response.send_listid
            })
        }

        return output;
    }

    async fissionSend({orderId, senderName, firstReceiverOpenId, money, amount, type = 'ALL_RAND', wishing, activityName, remark, spbillCreateIp = '127.0.0.1', sceneId = undefined,  riskInfo = undefined, consumeMchId = undefined, signType = "MD5"}){
        let nonceStr = uuid().replace(/-/g, '');
        let requestJson = {
            wxappid:  this.config.payment.appId,
            send_name:  senderName,
            re_openid: firstReceiverOpenId,
            mch_id: this.config.payment.mchId,
            act_name: activityName,
            nonce_str: nonceStr,
            mch_billno: orderId,
            client_ip: spbillCreateIp,
            total_amount: money,
            total_num: amount,
            amt_type: type,
            wishing: wishing,
            remark: remark
        }
        
        if(money > 200 || money < 1){
            if (sceneId == undefined) throw new Error('sceneId is needed when money > 200 or money < 1');
            requestJson.scene_id = sceneId;
        }

        if(riskInfo != undefined){
            requestJson.risk_info = riskInfo;
        }

        if(consumeMchId != undefined){
            requestJson.consume_mch_id = consumeMchId;
        }

        let common = new CommonPayment(this.logger, this.config);
        requestJson.sign = common.signGet({data: requestJson, signType});

        let xml = Object.keys(requestJson).map(key => {
            let item = {};
            item[key] = requestJson[key];
            return item;
        })
        let requestText = Xml([{xml}]);

        let response = await this.request.post
                        .url('https://api.mch.weixin.qq.com/mmpaymkttransfers/sendgroupredpack')
                        .ca({pfxFilePath: this.config.payment.pfxFile}, this.config.payment.mchId)
                        .xml(requestText)
                        .execute();
        
        response = this.paymentResponseJsonParse(response).xml;

        let output = {
            sign: response.sign,
            resultCode: response.result_code,
            errCode: response.err_code,
            errCodeDes: response.err_code_des
        }

        if (response.result_code == 'SUCCESS') {
            output = Object.assign(output, {
                orderId: response.mch_billno,
                mchId: response.mch_id,
                appId: response.wxappid,
                receiveOpenId: response.re_openid,
                money: response.total_amount,
                redPacketId: response.send_listid
            })
        }

        return output;
    }

    async infoGet({orderId,  signType = "MD5"}) {
        let nonceStr = uuid().replace(/-/g, '');
        let requestJson = {
            appid:  this.config.payment.appId,
            mch_id: this.config.payment.mchId,
            nonce_str: nonceStr,
            bill_type: 'MCHT',
            mch_billno: orderId
        }

        let common = new CommonPayment(this.logger, this.config);
        requestJson.sign = common.signGet({data: requestJson, signType});
        
        let xml = Object.keys(requestJson).map(key => {
            let item = {};
            item[key] = requestJson[key];
            return item;
        })

        let response = await this.request.post
                        .url('https://api.mch.weixin.qq.com/mmpaymkttransfers/gethbinfo')
                        .xml(Xml( [{xml}]))
                        .ca({pfxFilePath: this.config.payment.pfxFile}, this.config.payment.mchId)
                        .execute();

        response = this.paymentResponseJsonParse(response).xml;

        let output = {
            sign: response.sign,
            resultCode: response.result_code,
            errCode: response.err_code,
            errCodeDes: response.err_code_des
        }

        if (response.result_code == 'SUCCESS') {
            output = Object.assign(output, {
                orderId: response.mch_billno,
                mchId: response.mch_id,
                redPacketId: response.detail_id,
                status: response.status,
                appId: response.appid, 
                sendType: reponse.send_type,
                type: response.hb_type,
                money: response.total_amount, 
                amount: response.total_num,
                sendTime: response.send_time,
                wishing: response.wishing,
            })
            
            if (response.reason != undefined) output.reason = response.reason;
            if (response.refund_time != undefined) output.refundTime = response.refund_time;
            if (response.refund_amount != undefined) output.refundMoney = response.refund_amount;
            if (response.remark != undefined) output.remark = response.remark;
            if (response.act_name != undefined) output.activityName = response.act_name;
            if (response.hblist != undefined) output.redPacketList = response.hblist.map(_ => ({
                openId: _.openid,
                money: _.amount,
                receiveTime: _.rcv_time
            }));
        }

        return output;

    }
}