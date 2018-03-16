const xml2js = require('xml2js-parser').parseStringSync;
const Xml = require('xml');
const Base = require('../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async handle(request, response, next) {
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

            request.body = xml2js(incoming, { explicitArray : false, ignoreAttrs : true }).xml;

            response.reply = async (obj)=>{
                if(typeof obj == "object" && /[A-Za-z]{1,}Resource$/.test(obj.constructor.name)){
                    let createTime =parseInt(Date.now() / 1000);
                    let reponseJson = [
                        {FromUserName:  {_cdata: request.body.ToUserName}},
                        {ToUserName:  {_cdata: request.body.FromUserName}},
                        {CreateTime: createTime}
                    ];

                    reponseJson = reponseJson.concat(obj.toWechatAttr()) ;
                    let reponseText = Xml( [{xml:reponseJson}]);
                    response.send(reponseText);
                }
                else{
                    //不回复给客户端任何信息
                    response.send('success');
                }
            }

            next();

            //处理程序结束，若没有返回内容，则默认向微信回应success
            if(!response.finished){
                response.send('success');
            }
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.send('程序出错');
        }
    }
}