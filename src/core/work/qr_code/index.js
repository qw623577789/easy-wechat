const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);

    }

    loginGet({ redirectUrl, state = '' }) {
        return `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${this.config.work.corpId}&agentid=${this.config.work.appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&state=${state}`;
    }
}