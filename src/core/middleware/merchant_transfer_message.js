const crypto = require("crypto");
const Base = require('../base.js');

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
            let {
                'wechatpay-serial': wechatpaySerial,
                'wechatpay-signature': wechatpaySignature,
                'wechatpay-timestamp': wechatpayTimestamp,
                'wechatpay-nonce': wechatpayNonce
            } = request.headers;

            request.rawBody = '';
            request.setEncoding('utf8');
            request.on('data', (chunk) => { request.rawBody += chunk; });
            let incoming = await (new Promise((resolve, reject) => {
                request.on('end', () => { resolve(request.rawBody); });
            }));

            this.logger.package(`merchantTransferMessageCallback:${incoming}`);

            let jsonRequest = JSON.parse(incoming);

            this._signatureCheck(incoming, wechatpaySignature, wechatpayTimestamp, wechatpayNonce);

            request.body = this.rmUndef({
                id: jsonRequest.id,
                createTime: jsonRequest.create_time,
                eventType: jsonRequest.event_type,
                resourceType: jsonRequest.resource_type,
                resource: {
                    algorithm: jsonRequest.resource.algorithm,
                    data: this._decryptMsg(jsonRequest.resource),
                    associatedData: jsonRequest.resource.associated_data,
                    originalType: jsonRequest.resource.original_type,
                    nonce: jsonRequest.resource.nonce,
                },
                summary: jsonRequest.summary,
            });

            if (this._replier != undefined) await this._replier(request);
            response.end('{"code":"SUCCESS","message":"接收成功"}');

        } catch (error) {
            this.logger.error(`err in responseToWechat:${error.stack}`);
            response.end('{"code":"FAILED","message":"接收失败"}');
        }
    }

    _signatureCheck(bodyString, signature, timestamp, nonce) {
        let signRawString = `${timestamp}\n${nonce}\n${bodyString}\n`;

        let signer = crypto.createVerify('RSA-SHA256');
        signer.update(signRawString);

        let check = signer.verify(this.config.payment.signPublicKey, signature, 'base64');

        if (!check) {
            throw new Error(`invaild signature ,callback:${signature}`);
        }
    }

    _decryptMsg({ ciphertext, nonce, associated_data }) {

        // Base64 解码密文
        const ciphertextBuffer = Buffer.from(ciphertext, 'base64');

        // AEAD_AES_256_GCM 解密
        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(this.config.payment.apiV3CallbackAESKey, 'utf-8'), Buffer.from(nonce, 'utf-8'));

        if (associated_data) {
            // 设置附加认证数据
            decipher.setAAD(Buffer.from(associated_data, 'utf-8'));
        }

        // 提取 GCM 的校验码 (tag)
        const authTag = ciphertextBuffer.slice(-16);
        decipher.setAuthTag(authTag);

        // 提取实际加密数据
        const encryptedText = ciphertextBuffer.slice(0, -16);

        const decryptedData = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return JSON.parse(decryptedData.toString('utf-8'));

    }
}

