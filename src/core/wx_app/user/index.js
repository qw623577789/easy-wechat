const Base = require('../../base.js');
const crypto = require('crypto');

module.exports = class extends Base{
    constructor(logger, config = undefined) {
        super(logger, config);
    }

    infoDecrypt(encryptedData, iv, sessionId) {
        sessionId = new Buffer(sessionId, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');
        
        let decipher = crypto.createDecipheriv('aes-128-cbc', sessionId, iv)
        decipher.setAutoPadding(true)
        let decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')
        decoded = JSON.parse(decoded)

        if (decoded.watermark.appid !== this.config.wxApp.appId) {
            throw new Error('Illegal appId')
        }
        
        return decoded;                      
    }

}