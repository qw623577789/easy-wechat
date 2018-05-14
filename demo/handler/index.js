const Es = require('easy-wechat');
const es = new Es({
    platform: {
        appId: 'xxxx',
        secret: 'xxxx',
        token: 'xxxxxx'
    },
    wxApp: {
        appId: 'xxxxxxxx',
        secret: 'xxxxxxxxxxxxxxxxx',
        msgPush: {
            token: 'xxxxxxxxxxxxxxxxxx',
            encodingAESKey: 'xxxxxxxxxxxxxx'
        }
    },
    payment: {
        appId: 'xxxxxxxxxx',
        mchId: 'xxxxxxxxx',
        key: 'xxxxxxxxxxxx',
        notifyUrl: 'xxxxxxxxxxxxxxxxxxxx'
    }
});

module.exports = (router) => {
    router.get('/platform.msg.push',(request, response) => {
        response.end(request.query.echostr);
    });

    //支付～～～～～
    router.get('/payment.create',async (request, response) => {
        let info = await es.payment.create(Date.now(), "description", "detail", 101, Es.Constant.Payment.TradeType.JS, 'o1Iue1FB0xBCaZQVqH3qMbZasr18', '127.0.0.1');
        response.json(info);
    });

    router.get('/payment.get',async (request, response) => {
        let info = await es.payment.get('20180316024129108919103', '');
        response.json(info);
    });

    //小程序～～～～～～～～～～～～
    //user
    router.get('/wxapp.user.infoDecrypt',async (request, response) => {
        let sessionKey = 'tiihtNczf5v6AKRyjwEUhQ==';
        let encryptedData = 
            'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
            'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
            '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
            '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
            'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
            'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
            '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
            'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
            '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
            '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
            'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
            '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
            '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
            'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
            'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
            '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
            'Db/XcxxmK01EpqOyuxINew==';
        let iv = 'r7BXXKkLb8qrSNn05n0qiA==';
        let info = es.wxApp.user.infoDecrypt(encryptedData, iv, sessionKey);
        response.json(info);
    });

    //session
    router.get('/wxapp.session.get',async (request, response) => {
        let code = request.query.code;
        let info = await es.wxApp.session.get(code);
        response.json(info);
    });

    //推送
    router.get('/wxapp.msg.cs.text.send',async (request, response) => {
        let info = await es.wxApp.msg.cs.sendText('owqhY5MvPbuiJcnBmjb0cXv3pJdE', "11111");
        response.json(info);
    });

    router.get('/wxapp.msg.template.push',async (request, response) => {
        let formId = request.query.formId;
        let info = await es.wxApp.msg.template.push('owqhY5MvPbuiJcnBmjb0cXv3pJdE', 'Tfyej4uqRudQkfwAXKlrTl11IN_2N0wyQn79zNMb6nk', formId, {
            keyword1: {
                value:  'TIT造舰厂',
                color: '#123455'
            },
            keyword2: {
                value:  '2016年6月6日',
                color: '#223455'
            },
            keyword3: {
                value:  '咖啡',
                color: '#323455'
            }
        }, 'keyword1.DATA', 'index?foo=bar', '#173177');
        response.json(info);
    });

    //二维码
    router.get('/wxapp.qrCode.a.get',async (request, response) => {
        let buffer = await es.wxApp.qrCode.getAQRCode('http://www.baidu.com', 500, false, {r:5, g:3, b: 2});
        response.set("Content-Type",'image/jpeg');
        response.send(buffer);
    });

    router.get('/wxapp.qrCode.b.get',async (request, response) => {
        let buffer = await es.wxApp.qrCode.getBQRCode("scene", 'pages/index/index', 500, false, {r:8, g:3, b: 2});
        response.set("Content-Type",'image/jpeg');
        response.send(buffer);
    });
    
    //公众号～～～～～～～～～～～～
    //user
    router.get('/platform.user.get_by_normal_accessToken',async (request, response) => {
        let info = await es.platform.user.infoGetByNormalAccessToken('oga5Q0fEb_X7_NFu5EpcvkMp3Qzo');
        response.json(info);
    });
    
    router.get('/platform.user.get_by_oauth_accessToken',async (request, response) => {
        let code = request.query.code;
        let {access_token: accessToken} = await es.platform.oauth.accessToken.get(code);
        let info = await es.platform.user.infoGetByOAuthAccessToken(accessToken, 'oga5Q0fEb_X7_NFu5EpcvkMp3Qzo');
        response.json(info);
    });

    //code
    router.get('/platform.code.get_for_base',async (request, response) => {
        let url = await es.platform.oauth.code.getForBase('https://wechat.dierxuetang.com/platform.user.get_by_oauth_accessToken');console.log(url)
        response.redirect(url);
    });
    
    router.get('/platform.user.get_for_user_info',async (request, response) => {
        let url = await es.platform.oauth.code.getForUserInfo('https://wechat.dierxuetang.com/platform.user.get_by_oauth_accessToken');
        response.redirect(url);
    });

    //menu
    router.get('/platform.menu.get',async (request, response) => {
        let menu = await es.platform.menu.get();
        response.json(menu);
    });

    router.get('/platform.menu.delete',async (request, response) => {
        await es.platform.menu.delete();
        response.end('ok');
    });

    router.get('/platform.menu.set',async (request, response) => {
        let menuInfo = {
            "button":[
                {	
                    "type":"view",
                    "name":"我要加油",
                    "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23"
                },
                {	
                    "type":"view",
                    "name":"附近油站",
                    "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23%2fnearby-station"
                },
                {	
                    "name":"我的兆方卡",
                    "sub_button": [
                        {
                            "type":"view",
                            "name":"我的兆方卡",
                            "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2f%3f%23%2fmine"
                        },
                        {	
                            "type":"view",
                            "name":"新手教程",
                            "url":"http://test.blackgold.qubaotech.com/proxy/wechat.user.authorize?referer=http%3a%2f%2ftest.blackgold.qubaotech.com%2fguide.html"
                        }
                    ]
                },
    
            ]
        }
        await es.platform.menu.set(menuInfo);
        response.end('ok');
    });

    //js
    router.get('/platform.js.config_get',async (request, response) => {
        let info = await es.platform.js.configGet('http://www.baidu.com');
        response.json(info);
    });

    //middleware
    router.use('/wxapp.msg.push', es.middleware.wxAppJsonMessage, (request) => {
        console.log(request.body)
    })

    router.use('/wxapp.msg.push', es.middleware.wxAppXmlMessage, (request) => {
        console.log(request.body)
    })

    router.use('/platform.msg.push', es.middleware.platformMessage, (request, response) => {
        console.log(request.body);
        let a = es.platform.resource;
        response.reply(new es.platform.resource.Text('2222222'))
    })

    router.use('/payment.notify', es.middleware.payment, (request) => {
        console.log(request.body);
    })
}