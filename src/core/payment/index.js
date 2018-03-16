const dateFormat = require('dateformat');
const constant = require('../../constant');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const Xml = require('xml');
const Base = require('../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async create(orderId, description, detail, price, tradeType, openId = '', spbillCreateIp = '127.0.0.1', attach ='',  startTime = undefined, endTime = undefined, productId = '', feeType = 'CNY', deviceInfo = 'WEB', signType = "MD5", goodsTag = '', limitPay = '', sceneInfo = null){
        let nonceStr = uuid().replace(/-/g, '');
        let notifyUrl = this.config.payment.notifyUrl;

        let requestJson = {
            appid:  this.config.payment.appId,
            attach:  attach,
            body: description,
            mch_id: this.config.payment.mchId,
            detail:{_cdata:detail},
            nonce_str: nonceStr,
            notify_url: this.config.payment.notifyUrl,
            out_trade_no: orderId,
            spbill_create_ip:spbillCreateIp,
            total_fee: price,
            trade_type: tradeType,
            fee_type: feeType,
            sign_type: signType
        }

        if(startTime != undefined){
            requestJson.time_start = dateFormat(startTime, "yyyymmddHHMMss");
            requestJson.time_expire = dateFormat(endTime, "yyyymmddHHMMss");
        }

        if(tradeType == constant.Payment.TradeType.SCAN){
            if(productId == '') throw new Error('productId is empty');
            requestJson.product_id = productId;
        }

        if(limitPay != ''){
            requestJson.limit_pay = limitPay;
        }

        if(tradeType == constant.Payment.TradeType.JS){
            if(openId == '') throw new Error('openId is empty');
            requestJson.openid = openId;
        }

        if(sceneInfo != null){
            requestJson.scene_info = {
                _cdata: JSON.stringify({
                    "store_info":{
                        "id":sceneInfo.id,
                        "name":sceneInfo.name,
                        "area_code":sceneInfo.areaCode,
                        "address":sceneInfo.address,
                    }
                })
            };
        }

        if(goodsTag != '') {
            requestJson.goods_tag = goodsTag;
        }

        requestJson.sign = this.signGet(requestJson, signType);

        let xml = Object.keys(requestJson).map(key => {
            let item = {};
            item[key] = requestJson[key];
            return item;
        })
        let requestText = Xml([{xml}]);

        let response = await this.request.post
                        .url('https://api.mch.weixin.qq.com/pay/unifiedorder')
                        .xml(requestText)
                        .execute();
        
        return this.paymentResponseJsonParse(response);
    }

    async get(wechatOrderId = "", orderId = "",  signType = "MD5") {
        if(wechatOrderId == "" && orderId == ""){
            throw new Error("empty wechatOrderId and orderId");
        }
        let nonceStr = uuid().replace(/-/g, '');
        let requestJson = {
            appid:  this.config.payment.appId,
            mch_id: this.config.payment.mchId,
            nonce_str: nonceStr,
            sign_type: signType
        }

        if(wechatOrderId != ""){
            requestJson.transaction_id = wechatOrderId;
        }
        else {
            requestJson.out_trade_no = orderId;
        }

        requestJson.sign = this.signGet(requestJson, signType);
        
        let xml = Object.keys(requestJson).map(key => {
            let item = {};
            item[key] = requestJson[key];
            return item;
        })

        let response = await this.request.post
                        .url('https://api.mch.weixin.qq.com/pay/orderquery')
                        .xml(Xml( [{xml}]))
                        .execute();

        return this.paymentResponseJsonParse(response);
    }

    signGet(requestJson, type = "MD5") {
        let targetText = Object.keys(requestJson)
                        .filter(_ => _ != 'sign' && requestJson[_] != '')
                        .sort((left, right) => (left < right) ? -1 : 1)
                        .reduce((sourceText, key) => {
                            sourceText += `${key}=${typeof requestJson[key] === "object" ? requestJson[key]._cdata : requestJson[key]}&`;
                            return sourceText;
                        }, "");

        targetText += "key=" + this.config.payment.key;

        if(type == "MD5"){
            return crypto.createHash('md5').update(targetText).digest('hex').toUpperCase();
        }
        else{
            return crypto.createHmac('sha256', this.config.payment.key).update(targetText).digest('hex');
        }
    }
}