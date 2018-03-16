const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    getForBase(redirectUrl, state = '') {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.config.platform.appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
    }

    getForUserInfo(redirectUrl, state = '') {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.config.platform.appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    }
}