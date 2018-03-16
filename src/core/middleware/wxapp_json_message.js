const crypto = require("crypto");
const Base = require('../base.js');

module.exports = class extends Base {
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    async handle(request, response, next) {
        try {
            let {msg_signature: rawSignature, rawTimestamp, rawNonce} = request.query;

            request.rawBody = '';
            request.setEncoding('utf8');
            request.on('data', (chunk) => { request.rawBody += chunk;});
            let incoming = await (new Promise( (resolve, reject)=>{
                request.on('end', () => {resolve(request.rawBody);});
            }));
            
            this.logger.package(`wechatAppMessageCallback:${incoming}`);

            if(incoming === '')  {
                response.end('success');
                return;
            }

            let jsonRequest = JSON.parse(incoming);

            this._signatureCheck(jsonRequest.Encrypt, rawSignature, rawTimestamp, rawNonce);
            request.body = this._decryptMsg(jsonRequest.Encrypt);

            next();

            //处理程序结束，若没有返回内容，则默认向微信回应success
            if(!response.finished){
                response.end('success');
            }
        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.end('success');
        }
    }

    _signatureCheck(encryptText, signature, timestamp, nonce) {
        let msgSignature = [this.config.wxApp.msgPush.token, timestamp, nonce, encryptText].sort().join('');
        let sha1 = crypto.createHash('sha1');
        if (sha1.update(msgSignature).digest('hex') === signature) {
            throw new Error(`invaild signature: ${msgSignature}`)
        }
    }
    
    _decryptMsg(encryptText) {
        let parseAesKey = new Buffer(this.config.wxApp.msgPush.encodingAESKey + '=', 'base64');
        let iv = parseAesKey.slice(0, 16);
        let aesCipher = crypto.createDecipheriv('aes-256-cbc', parseAesKey, iv);
        aesCipher.setAutoPadding(false);
        let decipheredBuff = Buffer.concat([aesCipher.update(encryptText, 'base64'), aesCipher.final()]);
        decipheredBuff = this._pKCS7Decoder(decipheredBuff);
        let lenNetOrderCorpid = decipheredBuff.slice(16);
        let msgLen = lenNetOrderCorpid.slice(0, 4).readUInt32BE(0);
        return {
            appId: lenNetOrderCorpid.slice(msgLen + 4).toString(),
            msg: JSON.parse(lenNetOrderCorpid.slice(4, msgLen + 4).toString())
        }
    }
    
    _pKCS7Decoder(buff) {
        let pad = buff[buff.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return buff.slice(0, buff.length - pad);
    }
}

