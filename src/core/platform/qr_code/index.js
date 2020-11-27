const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);

    }

    async get({ scene, permanent = false, expireSeconds = 60 * 60 * 24 }) {
        let queryData = {
            ...permanent
                ? {
                    "action_name": typeof scene === "number"
                        ? `QR_LIMIT_SCENE`
                        : `QR_LIMIT_STR_SCENE`,
                }
                : {
                    "expire_seconds": expireSeconds,
                    "action_name": typeof scene === "number"
                        ? `QR_SCENE`
                        : `QR_STR_SCENE`,
                },
            "action_info": {
                "scene": typeof scene === "number"
                    ? { "scene_id": scene }
                    : { "scene_str": scene }
            }
        }

        let accessToken = await this.config.context.platform.accessToken();
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`)
            .json(queryData)
            .execute();

        let { ticket, expire_seconds, url } = await this.commonResponseJsonParse(response);

        return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`
    }
}