module.exports = class {
    static get Payment() {
        return {
            TradeType: {
                JS:'JSAPI',
                SCAN:'NATIVE',
                APP:'APP',
                MICROPAY:'MICROPAY',
                MWEB: 'MWEB'
            },
            EncryptType: {
                MD5:'MD5',
                SHA256:'SHA256'
            },
            TradeStatus: {
                SUCCESS: 'SUCCESS',
                REFUND: 'REFUND',
                NOTPAY: 'NOTPAY',
                CLOSED: 'CLOSED',
                REVOKED: 'REVOKED',
                USERPAYING: 'USERPAYING',
                PAYERROR: 'PAYERROR'
            }
        }
    }
}