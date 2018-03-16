const uuid = require('uuid/v4');
const crypto = require('crypto');
const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async configGet(originUrl) {
        let jsApiTicket = await this.config.context.platform.jsApiTicket();
        let timeStamp = parseInt(Date.now() / 1000);
        let nonceStr = uuid().replace(/-/g, '');
        let signature = this._getSign({
            noncestr :nonceStr,
            jsapi_ticket : jsApiTicket,
            timestamp : timeStamp,
            url : originUrl.indexOf('#') != -1 ? originUrl.substr(0, originUrl.indexOf('#') - 1) : originUrl
        });

        let config = {
            timeStamp : timeStamp,
            signature,
            appId : this.config.platform.appId,
            nonceStr
        }

        return config;
    }

    _getSign(jsonObj){
        let paramsArray = [];
        for(let key in jsonObj){
            if(jsonObj[key] == '')continue;
            if(key == 'sign')continue;
            paramsArray.push({key:key, value:jsonObj[key]});
        }
        let targetText = paramsArray.sort((left, right)=>{
            if(left.key < right.key)
                return -1;
            else
                return 1;
        }) .reduce((sourceText, item, index)=>{
            sourceText += item.key + "=" + (typeof item.value === "object"?item.value._cdata:item.value)  + (index == paramsArray.length -1 ? "" : "&");
            return sourceText;
        }, "");

        return crypto.createHash('sha1').update(targetText).digest('hex');
    }
}