const xml2js = require('xml2js-parser').parseStringSync;
const Xml = require('xml');
const crypto = require('crypto');
const constant = require("../../constant");
const Base = require('../base.js');
const PaymentCore = require('../payment');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async handle(request, response, next) {
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
            let paymentCore = new PaymentCore(this.logger, this.config);

            let requestSign = paymentCore.signGet(sourceJson, typeof sourceJson.sign_type === "undefined"?constant.Payment.EncrypType.MD5:sourceJson.sign_type);
            if(requestSign != sourceJson.sign){
                response.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[验签失败]]></return_msg></xml>');
                return ;
            }

            request.body = sourceJson;
            next();

            //处理程序结束，若没有返回内容，则默认向微信回应success
            if(!response.finished){
                response.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
            }
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[程序出错]]></return_msg></xml>');
        }
    }

}