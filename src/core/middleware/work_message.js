const crypto = require('crypto');
const Base = require('../base.js');
const xml2js = require('xml2js-parser').parseStringSync;
const Xml = require('xml');
const uuid = require('uuid').v4;
const WorkResource = {
    Text: require('../work/resource/text'),
    Article: require('../work/resource/article'),
    Image: require('../work/resource/image'),
    Video: require('../work/resource/video'),
    Voice: require('../work/resource/voice'),
};

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
            let { msg_signature: rawSignature, timestamp: rawTimestamp, nonce: rawNonce, echostr } = request.query;

            // url验证
            if (request.method === 'GET') {
                this._signatureCheck(echostr, rawSignature, rawTimestamp, rawNonce);

                let { msg: body } = this._decryptMsg(echostr);

                this.logger.package(`workMessageCallback:${body}`);

                response.end(body);
            }
            // 消息回调
            else {
                request.rawBody = '';
                request.setEncoding('utf8');
                request.on('data', (chunk) => { request.rawBody += chunk; });
                let incoming = await (new Promise(resolve => {
                    request.on('end', () => { resolve(request.rawBody); });
                }));

                let jsonRequest = xml2js(incoming, { explicitArray: false, ignoreAttrs: true }).xml;

                this._signatureCheck(jsonRequest.Encrypt, rawSignature, rawTimestamp, rawNonce);

                incoming = this._decryptMsg(jsonRequest.Encrypt).msg;

                this.logger.package(`workMessageCallback:${incoming}`);

                let body = xml2js(incoming, { explicitArray: false, ignoreAttrs: true }).xml;

                request.body = Object.entries(body)
                    .reduce((prev, [key, value]) => {
                        prev[
                            key.replace(/^[A-Z]{1}/, (c) => c.toLowerCase())
                                .replace(/\_[a-z]{1}/g, (c) => c.substr(1).toUpperCase())
                        ] = value;
                        return prev;
                    }, {});

                if (this._replier != undefined) {
                    let reply = await this._replier(request, {
                        text: (text) => new WorkResource.Text(text),
                        article: (articles) => new WorkResource.Article(articles),
                        image: (mediaId) => new WorkResource.Image(mediaId),
                        video: ({
                            mediaId,
                            title = undefined,
                            description = undefined
                        }) => new WorkResource.Video({
                            mediaId,
                            title,
                            description
                        }),
                        voice: (mediaId) => new WorkResource.Voice(mediaId)
                    })

                    if (typeof reply == "object" && /[A-Za-z]{1,}Resource$/.test(reply.constructor.name)) {
                        let createTime = parseInt(Date.now() / 1000);

                        let reponseRawText = Xml([{ 
                            xml: [
                                { FromUserName: { _cdata: request.body.toUserName } },
                                { ToUserName: { _cdata: request.body.fromUserName } },
                                { CreateTime: createTime },
                                ...reply.toWechatAttr()
                            ] 
                        }]);

                        // 构造返回体
                        let encryptReponseText = this._encryptMsg(reponseRawText);
                        let nonce = uuid();
                        let encryptReponseSign = crypto.createHash('sha1').update([
                            this.config.work.token,
                            createTime,
                            nonce,
                            encryptReponseText
                        ]
                            .sort()
                            .join('')
                        )
                            .digest('hex')

                        let encryptStruct = [
                            { Encrypt: { _cdata: encryptReponseText } },
                            { Nonce: { _cdata: nonce } },
                            { MsgSignature: { _cdata: encryptReponseSign } },
                            { TimeStamp: createTime }
                        ]

                        response.send(Xml([{ xml: encryptStruct }]));
                    }
                    else {
                        //不回复给客户端任何信息
                        response.send('success');
                    }
                }
                else {
                    //不回复给客户端任何信息
                    response.send('success');
                }
            }
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.end('success');
        }
    }

    _signatureCheck(encryptText, signature, timestamp, nonce) {
        let msgSignature = [this.config.work.token, timestamp, nonce, encryptText].sort().join('');
        let sha1 = crypto.createHash('sha1');
        if (sha1.update(msgSignature).digest('hex') !== signature) {
            throw new Error(`invaild signature: ${msgSignature}`)
        }
    }

    _decryptMsg(encryptText) {
        let parseAesKey = Buffer.from(this.config.work.aesKey + '=', 'base64');
        let iv = parseAesKey.slice(0, 16);
        let aesCipher = crypto.createDecipheriv('aes-256-cbc', parseAesKey, iv);
        aesCipher.setAutoPadding(false);
        let decipheredBuff = Buffer.concat([aesCipher.update(encryptText, 'base64'), aesCipher.final()]);
        decipheredBuff = this._pkcs7Decoder(decipheredBuff);
        let msgLen = decipheredBuff.slice(16, 20).readUInt32BE(0);
        return {
            corpId: decipheredBuff.slice(msgLen + 20).toString(),
            msg: decipheredBuff.slice(20, msgLen + 20).toString()
        }
    }

    _encryptMsg(message) {
        let parseAesKey = Buffer.from(this.config.work.aesKey + '=', 'base64');
        let iv = parseAesKey.slice(0, 16);

        const msg = Buffer.from(message);
        const msgLength = Buffer.allocUnsafe(4);
        const random = crypto.randomBytes(16);
        msgLength.writeUInt32BE(msg.length, 0);
        const deciphered = this._pkcs7Pad(Buffer.concat([
            random,
            msgLength,
            msg,
            Buffer.from(this.config.work.corpId),
        ]));
        const cipher = crypto.createCipheriv('aes-256-cbc', parseAesKey, iv);
        cipher.setAutoPadding(false);
        const ciphered = Buffer.concat([
            cipher.update(deciphered),
            cipher.final(),
        ]);
        // 返回加密数据的base64编码
        return ciphered.toString('base64');
    }

    _pkcs7Decoder(buff) {
        let pad = buff[buff.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return buff.slice(0, buff.length - pad);
    }

    _pkcs7Pad(data) {
        const padLength = 32 - (data.length % 32);
        const result = Buffer.allocUnsafe(padLength);
        result.fill(padLength);
        return Buffer.concat([data, result]);
    }
}

