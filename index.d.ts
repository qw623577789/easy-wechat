import _Constant = require('./src/constant');

declare class EasyWechat {
    constructor(opts: EasyWechat.Options, logDirectory?: undefined | string)
    const config: EasyWechat.Options;
    const platform: EasyWechat.PlatformFunc;
    const wxApp: EasyWechat.WxAppFunc;
    const payment: EasyWechat.PaymentFunc;
    const middleware: EasyWechat.Middleware;
}

declare namespace EasyWechat {
    interface Options {
        platform?: EasyWechatOptions.Platform,
        wxApp?: EasyWechatOptions.WxApp,
        payment?: EasyWechatOptions.Payment
    }

    interface PlatformFunc {
        oauth: EasyWechatPlatformFunc.OAuth;
        user: EasyWechatPlatformFunc.User;
        menu: EasyWechatPlatformFunc.Menu;
        fs: EasyWechatPlatformFunc.FS;
        resource: EasyWechatPlatformResource
    }

    interface WxAppFunc {
        user: EasyWechatWxAppFunc.User;
        msg: {
            template: EasyWechatWxAppFunc.TemplateMessage;
            cs: EasyWechatWxAppFunc.CSMessage;
        };
        qrCode: EasyWechatWxAppFunc.QrCode;
        session: EasyWechatWxAppFunc.Session;
    }

    interface PaymentFunc {
        create(
            orderId: string, description: string, 
            detail: string, price: number, 
            tradeType, openId?: '' | string, 
            spbillCreateIp?: '127.0.0.1' | string, attach?: '' | string,
            startTime?: undefined | Date | string | number, 
            endTime?: undefined | Date | string | number,
            productId?: '' | string, feeType:? 'CNY', 
            deviceInfo?: 'WEB', signType?: "MD5", 
            goodsTag?: '', limitPay?: '', 
            sceneInfo?: null
        ): Promise<any>;

        get(wechatOrderId?: "", orderId?: "",  signType?: "MD5"): Promise<any>;

        signGet(requestJson: any, type?: "MD5" | string): string; 
    }

    interface Middleware {
        platformMessage: Function;
        payment: Function;
        wxAppJsonMessage: Function;
        wxAppXmlMessage: Function;
    }

    class Constant extends _Constant {}

    namespace Resource {
        class Text {
            constructor(text: string);
        }

        class Article {
            constructor(mediaId: string, title: string, description: string, musicUrl: string, hqMusicUrl: string, thumbMediaId: string);
        }

        class Image {
            constructor(mediaId: string);
        }

        class Music {
            constructor(mediaId: string, title: string, description: string, musicUrl: string, hqMusicUrl: string, thumbMediaId: string);
        }

        class Video {
            constructor(mediaId: string, title: string, description: string);
        }

        class Voice {
            constructor(mediaId: string);
        }
    }

}

declare namespace EasyWechatOptions {
    interface Platform {
        appId: string,
        secret: string,
        token?: string,
        aesKey?: string
    }

    interface WxApp {
        appId: string,
        secret: string,
        msgPush: {
            token: string,
            encodingAESKey: string
        }
    }

    interface Payment {
        appId: string,
        mchId: string,
        key: string,
        notifyUrl: string
    }
}

declare namespace EasyWechatPlatformFunc {
    interface OAuth {
        code: {
            getForBase(redirectUrl: string, state?: "" | string): string,
            getForUserInfo(redirectUrl: string, state?: "" | string): string
        },
        accessToken: {
            get(code: string): Promise<any>;
            refresh(refreshToken: string): Promise<any>;
            check(accessToken: string, openId: string): Promise<any>; 
        }
    }

    interface User {
        infoGetByOAuthAccessToken(accessToken: string, openId: string): Promise<any>;
        infoGetByNormalAccessToken(openId: string): Promise<any>;
    }

    interface Menu {
        get(): Promise<any>;
        set(menuJson: any): Promise<any>;
        delete(): Promise<any>;
    }

    interface Fs {
        configGet(originUrl: string): any;
    }
}

declare namespace EasyWechatWxAppFunc {
    interface User {
        infoDecrypt(encryptedData: string, iv: string, sessionId: string): any;
    }

    interface TemplateMessage {
        push(openId: string, templateId: string, formId: string, modelData: any, emphasisKeyword?: undefined | string, wxAppPagePath?: undefined | string, color?: undefined | string): Promise<any>;
    }

    interface CSMessage {
        sendText(openId: string, text: string): Promise<any>;
        sendImage(openId: string, mediaId: string): Promise<any>;
        sendLink(openId: string, title: string, description: string, url: string, picUrl: string, thumbUrl: string): Promise<any>;
        sendPage(openId: string, title: string, wxAppPath: string, thumbMediaId: string): Promise<any>;
    }

    interface QrCode {
        getAQRCode(pagePath: string, width?: 430 | number, autoColor?: false | boolean, lineColor?: {r:0, g:0, b:0} | any): Promise<Buffer>;
        getBQRCode(scene: string, pagePath: string, width?: 430 | number, autoColor?: false | boolean, lineColor?: {r:0, g:0, b:0} | any): Promise<Buffer>;
    }

    interface Session {
        get(code: string): Promise<any>;
    }
}

export = EasyWechat;