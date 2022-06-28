const { validator: Validator, schema: { string, object, integer, empty, array, boolean } } = require('@qtk/schema');
const Logger = require('./src/lib/logger');


module.exports = class {

    constructor(opts, logDirectory = undefined) {
        let schema = object().desc("配置key").properties({
            platform: object().desc("公众号配置信息").properties({
                appId: string(),
                secret: string(),
                token: string(),
                aesKey: string()
            }).require("appId", "secret"),
            work: object().desc("企业微信配置信息").properties({
                corpId: string().desc("企业id"),
                appId: string().desc("自建应用id"),
                secret: string().desc("自建应用秘钥"),
                addressBookSecret: string().desc("通讯录应用秘钥"),
                token: string(),
                aesKey: string()
            }).require("corpId", "appId", "secret", "addressBookSecret"),
            wxApp: object().desc("微信小程序配置").properties({
                appId: string(),
                secret: string(),
                msgPush: object().desc("微信推送解密密匙").properties({
                    token: string(),
                    encodingAESKey: string()
                })
            }).requireAll(),
            app: object().desc("微信APP配置").properties({
                appId: string(),
                secret: string()
            }).requireAll(),
            payment: object().desc("微信支付支付").properties({
                appId: string(),
                mchId: string(),
                key: string(),
                notifyUrl: string(),
                refundNotifyUrl: string(),
                pfxFile: string().desc('微信商户平台证书')
            }).require('appId', 'mchId', 'key', 'notifyUrl')
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

        let CS = require('./src/core/platform/cs');
        let cs = new CS(this.logger, this.config);

        let TemplateMessage = require('./src/core/platform/msg/template.js');
        let templateMessage = new TemplateMessage(this.logger, this.config);

        let CSMessage = require('./src/core/platform/msg/cs.js');
        let csMessage = new CSMessage(this.logger, this.config);

        let Resource = require('./src/core/platform/resource/index.js');
        let resource = new Resource(this.logger, this.config);

        let QrCode = require('./src/core/platform/qr_code/index.js');
        let qrCode = new QrCode(this.logger, this.config);

        return {
            oauth,
            user,
            menu,
            js,
            cs,
            msg: {
                template: templateMessage,
                cs: csMessage,
            },
            resource,
            qrCode,
        }
    }

    get app() {
        let OAuth = require('./src/core/app/oauth');
        let oauth = new OAuth(this.logger, this.config);

        let User = require('./src/core/app/user');
        let user = new User(this.logger, this.config);

        return { oauth, user }
    }

    get payment() {
        let Common = require('./src/core/payment/common');
        let common = new Common(this.logger, this.config);

        let Order = require('./src/core/payment/order');
        let order = new Order(this.logger, this.config);

        let RedPacket = require('./src/core/payment/red_packet');
        let redPacket = new RedPacket(this.logger, this.config);

        return {
            common,
            order,
            redPacket
        };
    }

    get wxApp() {
        let TemplateMessage = require('./src/core/wx_app/msg/template.js');
        let templateMessage = new TemplateMessage(this.logger, this.config);

        let CSMessage = require('./src/core/wx_app/msg/cs.js');
        let csMessage = new CSMessage(this.logger, this.config);

        let Security = require('./src/core/wx_app/security/index.js');
        let security = new Security(this.logger, this.config);

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
            security,
            qrCode: qrCode,
            session: session
        }
    }

    get work() {
        let OAuth = require('./src/core/work/oauth');
        let oauth = new OAuth(this.logger, this.config);

        let User = require('./src/core/work/user');
        let user = new User(this.logger, this.config);

        let UserId = require('./src/core/work/user_id');
        let userId = new UserId(this.logger, this.config);

        let WxOpenId = require('./src/core/work/wx_open_id');
        let wxOpenId = new WxOpenId(this.logger, this.config);

        let JS = require('./src/core/work/js');
        let js = new JS(this.logger, this.config);

        let AppMessage = require('./src/core/work/msg/app.js');
        let appMessage = new AppMessage(this.logger, this.config);

        let Resource = require('./src/core/work/resource/index.js');
        let resource = new Resource(this.logger, this.config);

        let QrCode = require('./src/core/work/qr_code/index.js');
        let qrCode = new QrCode(this.logger, this.config);

        return {
            oauth,
            user,
            js,
            userId,
            wxOpenId,
            msg: {
                app: appMessage
            },
            resource,
            qrCode,
        }
    }

    get middleware() {
        let Payment = require('./src/core/middleware/payment');
        let payment = new Payment(this.logger, this.config);

        let Refund = require('./src/core/middleware/refund');
        let refund = new Refund(this.logger, this.config);

        let PlatformMessage = require('./src/core/middleware/platform_message');
        let platformMessage = new PlatformMessage(this.logger, this.config);

        let WxAppJsonMessage = require('./src/core/middleware/wxapp_json_message');
        let wxAppJsonMessage = new WxAppJsonMessage(this.logger, this.config);

        let WxAppXmlMessage = require('./src/core/middleware/wxapp_xml_message');
        let wxAppXmlMessage = new WxAppXmlMessage(this.logger, this.config);

        let WorkMessage = require('./src/core/middleware/work_message');
        let workMessage = new WorkMessage(this.logger, this.config);

        return {
            platformMessage: (replier = undefined) => {
                platformMessage.replier = replier;
                return (request, response) => platformMessage.handle(request, response);
            },
            payment: (replier = undefined) => {
                payment.replier = replier;
                return (request, response) => payment.handle(request, response);
            },
            refund: (replier = undefined) => {
                refund.replier = replier;
                return (request, response) => refund.handle(request, response);
            },
            wxAppJsonMessage: (replier = undefined) => {
                wxAppJsonMessage.replier = replier;
                return (request, response) => wxAppJsonMessage.handle(request, response);
            },
            wxAppXmlMessage: (replier = undefined) => {
                wxAppXmlMessage.replier = replier;
                return (request, response) => wxAppXmlMessage.handle(request, response);
            },
            workMessage: (replier = undefined) => {
                workMessage.replier = replier;
                return (request, response) => workMessage.handle(request, response);
            }
        }
    }

    static get Constant() { return require('./src/constant') }
}
