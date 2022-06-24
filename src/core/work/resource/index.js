const Base = require('../../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async temporaryUpload({
        type,
        resourceBase64,
        filename
    }) {
        let accessToken = await this.config.context.work.accessToken();
        const buffer = Buffer.from(resourceBase64, 'base64');
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`)
            .mutilForm({
                media: {
                    value: buffer,
                    options: {
                        filename
                    }
                }
            })
            .execute();
        let { media_id } = this.commonResponseJsonParse(response);
        return {
            type,
            mediaId: media_id
        }
    }

    async permanentUpload({ type, resourceBase64, filename }) {
        let accessToken = await this.config.context.work.accessToken();
        const buffer = Buffer.from(resourceBase64, 'base64');
        let response = await this.request.post
            .url(`https://qyapi.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${accessToken}`)
            .mutilForm({
                media: {
                    value: buffer,
                    options: {
                        filename
                    }
                }
            })
            .execute();

        let { url } = this.commonResponseJsonParse(response);

        return {
            type,
            url,
            createdAt: created_at
        }
    }
}