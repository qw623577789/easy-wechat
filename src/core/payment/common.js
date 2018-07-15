const crypto = require('crypto');
const Base = require('../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    signGet({data, signType = "MD5"}) {
        let targetText = Object.keys(data)
                        .filter(_ => _ != 'sign' && data[_] != undefined)
                        .sort((left, right) => (left < right) ? -1 : 1)
                        .reduce((sourceText, key) => {
                            sourceText += `${key}=${typeof data[key] === "object" ? data[key]._cdata : data[key]}&`;
                            return sourceText;
                        }, "");

        targetText += "key=" + this.config.payment.key;

        if(signType == "MD5"){
            return crypto.createHash('md5').update(targetText).digest('hex').toUpperCase();
        }
        else{
            return crypto.createHmac('sha256', this.config.payment.key).update(targetText).digest('hex');
        }
    }
}