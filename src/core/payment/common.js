const crypto = require('crypto');
const Base = require('../base.js');
const uuid = require('uuid/v4');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    signGet({ data, signType = "MD5" }) {
        let targetText = Object.keys(data)
            .filter(_ => _ != 'sign' && data[_] != undefined)
            .sort((left, right) => (left < right) ? -1 : 1)
            .reduce((sourceText, key) => {
                sourceText += `${key}=${typeof data[key] === "object" ? data[key]._cdata : data[key]}&`;
                return sourceText;
            }, "");

        targetText += "key=" + this.config.payment.key;

        if (signType == "MD5") {
            return crypto.createHash('md5').update(targetText).digest('hex').toUpperCase();
        }
        else {
            return crypto.createHmac('sha256', this.config.payment.key).update(targetText).digest('hex');
        }
    }

    v3SignGet(method, path, data) {
        let nonceStr = uuid().replace(/-/g, '');
        let timestamp = parseInt(Date.now() / 1000);
        let signRawString = `${method}\n${path}\n${timestamp}\n${nonceStr}\n${method === 'POST' ? JSON.stringify(data) : ""}\n`;

        let signer = crypto.createSign('RSA-SHA256');
        signer.update(signRawString);
        let sign = signer.sign(this.config.payment.signPrivateKey, 'base64');

        return `WECHATPAY2-SHA256-RSA2048 mchid="${this.config.payment.mchId}",nonce_str="${nonceStr}",signature="${sign}",timestamp="${timestamp}",serial_no="${this.config.payment.certificateSerialNumber}"`;
    }
}
