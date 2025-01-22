const crypto = require('crypto');
const Base = require('../base.js');
const xml2js = require('xml2js-parser').parseStringSync;

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

                this.logger.package(`workCsMessageCallback:${body}`);

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

                this.logger.package(`workCsMessageCallback:${incoming}`);

                let body = xml2js(incoming, { explicitArray: false, ignoreAttrs: true }).xml;

                request.body = Object.entries(body)
                    .reduce((prev, [key, value]) => {
                        prev[
                            key.replace(/^[A-Z]{1}/, (c) => c.toLowerCase())
                                .replace(/\_[a-z]{1}/g, (c) => c.substr(1).toUpperCase())
                        ] = value;
                        return prev;
                    }, {});

                response.send('success');
            }
        }
        catch (error) {
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

    _pkcs7Decoder(buff) {
        let pad = buff[buff.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return buff.slice(0, buff.length - pad);
    }
}

