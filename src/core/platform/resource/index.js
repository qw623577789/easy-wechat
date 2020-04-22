const Base = require('../../base.js');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async permanentUpload({
        type, 
        resourceBase64, 
        filename,
        videoTitle,
        videoIntroduction
    }) {
        let accessToken = await this.config.context.platform.accessToken();
        const buffer = Buffer.from(resourceBase64, 'base64');
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=${type}`)
            .mutilForm({
                media: { 
                    value: buffer, 
                    options: { 
                        filename 
                    } 
                },
                description: type === 'video' ? JSON.stringify(
                    this.rmUndef({
                        title: videoTitle,
                        introduction: videoIntroduction
                    })
                ) : ""
            })
            .execute();
        let {media_id, url} = this.commonResponseJsonParse(response);
        return {
            type, 
            mediaId: media_id, 
            url
        }
    }

    async temporaryUpload({type, resourceBase64, filename}) {
        let accessToken = await this.config.context.platform.accessToken();
        const buffer = Buffer.from(resourceBase64, 'base64');
        let response = await this.request.post
            .url(`https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`)
            .mutilForm({
                media: { 
                    value: buffer, 
                    options: { 
                        filename 
                    } 
                } 
            })
            .execute();

        let {media_id, created_at, thumb_media_id} = this.commonResponseJsonParse(response);

        return {
            type, 
            mediaId: media_id || thumb_media_id, 
            createdAt: created_at
        }
    }
}