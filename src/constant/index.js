module.exports = class {
    static get Payment() {
        return {
            TradeType: {
                JS:'JSAPI',
                SCAN:'NATIVE',
                APP:'APP',
                MICROPAY:'MICROPAY'
            },
            EncrypType: {
                MD5:'MD5',
                SHA256:'SHA256'
            }
        }
    }
}