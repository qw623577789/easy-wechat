const xml2js = require('xml2js-parser').parseStringSync;
const crypto = require('crypto');
const Base = require('../base.js');

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
            this.logger.package(`wechatRefundCallback:${incoming}`);

            let sourceJson = xml2js(incoming, { explicitArray : false, ignoreAttrs : true }).xml;
            request.body = Object.assign(await this._decryptMsg(sourceJson.req_info), {appId: sourceJson.appid, mchId: sourceJson.mch_id});
            if (this._replier != undefined) await this._replier(request);

            //向微信回应success
            response.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[程序出错]]></return_msg></xml>');
        }
    }

    async _decryptMsg(encryptText) {
        let key = crypto.createHash('md5').update(this.config.payment.key).digest('hex').toLowerCase();
        let aesDecipher = crypto.createDecipheriv('aes-256-ecb', key, "");
        aesDecipher.setAutoPadding(true);
        let aesDecipherChunks = aesDecipher.update(encryptText, 'base64', 'utf8');
        aesDecipherChunks += aesDecipher.final('utf8');
        let data = xml2js(aesDecipherChunks, { explicitArray : false, ignoreAttrs : true }).root;
        let msg = {};
        Object.keys(data).forEach(key => {
            msg[
                key.replace(/^[A-Z]{1}/, (c) => c.toLowerCase())
                    .replace(/\_[a-z]{1}/g, (c) => c.substr(1).toUpperCase())
            ] = data[key];
        });

        return msg;
    }

}