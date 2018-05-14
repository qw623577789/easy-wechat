const {validator: Validator, describer: {string, object, integer, empty, array, boolean}} = require('semantic-schema');
const Logger = require('./src/lib/logger');


module.exports = class {

    constructor(opts, logDirectory = undefined){
        let schema = object().desc("配置key").properties({
            platform: object().desc("公众号配置信息").properties({
                appId: string(),
                secret: string(),
                token: string(),
                aesKey: string()
            }).required("appId", "secret"),
            wxApp: object().desc("微信小程序配置").properties({
                appId: string(),
                secret: string(),
                msgPush: object().desc("微信推送解密密匙").properties({
                    token: string(),
                    encodingAESKey: string()
                })
            }).requiredAll(),
            payment: object().desc("微信支付支付").properties({
                appId: string(),
                mchId: string(),
                key: string(),
                notifyUrl: string()
            }).requiredAll()
        })

        let validator = new Validator(schema);
        validator.validate(opts);

        this._logger = new Logger(logDirectory);
        this._config = opts;
        let Context = require('./src/core/context');
        this._config.context = new Context(this._logger, this._config);
    }

    get config() {
        return this._config;
    }

    get logger() {
        return this._logger;
    }

    get platform() {
        let OAuth = require('./src/core/platform/oauth');
        let oauth = new OAuth(this.logger, this.config);

        let User = require('./src/core/platform/user');
        let user = new User(this.logger, this.config);

        let Menu = require('./src/core/platform/menu');
        let menu = new Menu(this.logger, this.config);

        let JS = require('./src/core/platform/js');
        let js = new JS(this.logger, this.config);

        let Resource = require('./src/core/platform/resource');

        return {oauth, user, menu, js, Resource}
    }

    get payment() {
        let Payment = require('./src/core/payment');
        let payment = new Payment(this.logger, this.config);
        return payment;
    }

    get wxApp() {
        let TemplateMessage = require('./src/core/wx_app/msg/template.js');
        let templateMessage = new TemplateMessage(this.logger, this.config);

        let CSMessage = require('./src/core/wx_app/msg/cs.js');
        let csMessage = new CSMessage(this.logger, this.config);

        let QrCode = require('./src/core/wx_app/qr_code');
        let qrCode = new QrCode(this.logger, this.config);

        let Session = require('./src/core/wx_app/session');
        let session = new Session(this.logger, this.config);

        let User = require('./src/core/wx_app/user');
        let user = new User(this.logger, this.config);

        return {
            user: user,
            msg: {
                template: templateMessage,
                cs: csMessage,
            },
            qrCode: qrCode,
            session: session
        }
    }

    get middleware() {
        let Payment = require('./src/core/middleware/payment');
        let payment = new Payment(this.logger, this.config);

        let PlatformMessage = require('./src/core/middleware/platform_message');
        let platformMessage = new PlatformMessage(this.logger, this.config);

        let WxAppJsonMessage = require('./src/core/middleware/wxapp_json_message');
        let wxAppJsonMessage = new WxAppJsonMessage(this.logger, this.config);

        let WxAppXmlMessage = require('./src/core/middleware/wxapp_xml_message');
        let wxAppXmlMessage = new WxAppXmlMessage(this.logger, this.config);

        return {
            platformMessage: (request, response, next) => platformMessage.handle(request, response, next),
            payment: (request, response, next) => payment.handle(request, response, next),
            wxAppJsonMessage: (request, response, next) => wxAppJsonMessage.handle(request, response, next),
            wxAppXmlMessage: (request, response, next) => wxAppXmlMessage.handle(request, response, next)
        }
    }

    static get Constant(){return require('./src/constant')}
}
