const xml2js = require('xml2js-parser').parseStringSync;
const Xml = require('xml');
const crypto = require('crypto');
const constant = require("../../constant");
const Base = require('../base.js');
const PaymentCommon = require('../payment/common');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
        this._replier = null;
    }

    set replier(replier) {
        this._replier = replier;
    }

    async handle(request, response) {
        try {
            request.rawBody = '';
            request.setEncoding('utf8');
            request.on('data', (chunk) => { request.rawBody += chunk;});
            let incoming = await (new Promise( (resolve, reject)=>{
                request.on('end', () => {resolve(request.rawBody);});
            }));
            this.logger.package(`wechatPaymentCallback:${incoming}`);

            let sourceJson = xml2js(incoming, { explicitArray : false, ignoreAttrs : true }).xml;
    
            //验签
            let paymentCommon = new PaymentCommon(this.logger, this.config);

            let requestSign = paymentCommon.signGet({data: sourceJson, signType: typeof sourceJson.sign_type === "undefined"?constant.Payment.EncryptType.MD5:sourceJson.sign_type});
            if(requestSign != sourceJson.sign){
                response.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[验签失败]]></return_msg></xml>');
                return ;
            }

            request.body = {};
            Object.keys(sourceJson).forEach(key => {
                request.body[
                    key.replace(/^[A-Z]{1}/, (c) => c.toLowerCase())
                        .replace(/\_[a-z]{1}/g, (c) => c.substr(1).toUpperCase())
                ] = sourceJson[key];
            });

            if (this._replier != undefined) await this._replier(request);

            //向微信回应success
            response.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[程序出错]]></return_msg></xml>');
        }
    }

}