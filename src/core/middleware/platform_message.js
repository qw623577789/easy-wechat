const xml2js = require('xml2js-parser').parseStringSync;
const Xml = require('xml');
const Base = require('../base.js');
const PlatformResource =  require('../platform/resource');
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
            this.logger.package(`wechatMessageCallback:${incoming}`);

            if(incoming === '')  {
                response.send('success');
                return;
            }

            let data = xml2js(incoming, { explicitArray : false, ignoreAttrs : true }).xml;
            request.body = {};
            Object.keys(data).forEach(key => {
                request.body[key.replace(/^[A-Z]{1}/, (c) => c.toLowerCase())] = data[key];
            });

            if (this._replier != undefined) {
                let reply = await this._replier(request, {
                    text: (text) => new PlatformResource.Text(text),
                    article: (articles) => new PlatformResource.Article(articles),
                    image: (mediaId) => new PlatformResource.Image(mediaId),
                    music: ({thumbMediaId, title = undefined, description = undefined, musicUrl = undefined, hqMusicUrl = undefined}) => new PlatformResource.Music({thumbMediaId, title, description, musicUrl, hqMusicUrl}),
                    video: ({mediaId, title = undefined, description = undefined}) => new PlatformResource.Video({mediaId, title, description}),
                    voice: (mediaId) => new PlatformResource.Voice(mediaId)
                })

                if(typeof reply == "object" && /[A-Za-z]{1,}Resource$/.test(reply.constructor.name)) {
                    let createTime = parseInt(Date.now() / 1000);
                    let reponseJson = [
                        {FromUserName:  {_cdata: request.body.toUserName}},
                        {ToUserName:  {_cdata: request.body.fromUserName}},
                        {CreateTime: createTime}
                    ];

                    reponseJson = reponseJson.concat(reply.toWechatAttr()) ;
                    let reponseText = Xml([{xml:reponseJson}]);
                    response.send(reponseText);
                }
                else{
                    //不回复给客户端任何信息
                    response.send('success');
                }
            }
            else {
                //不回复给客户端任何信息
                response.send('success');
            }
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.send('程序出错');
        }
    }
}
