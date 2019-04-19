const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-获取菜单",
    description: ""
};

const request = empty()

const subButton = array().desc('二级菜单').item(
    oneOf(
        {
            type: 'click',
            name: string().desc('标签名'),
            key: string().desc('标签key')
        },
        {
            type: 'view',
            name: string().desc('标签名'),
            url: string().desc('url'),
            sub_button: array().length(0)
        },
        {
            type: 'miniprogram',
            name: string().desc('标签名'),
            url: string().desc('url'),
            appid: string().desc('小程序id'),
            pagepath: string().desc('小程序的页面路径')
        },
        {
            type: 'scancode_waitmsg',
            name: string().desc('标签名'),
            key: string().desc('标签key'),
            sub_button: array().length(0)
        },
        {
            type: 'scancode_push',
            name: string().desc('标签名'),
            key: string().desc('标签key'),
            sub_button: array().length(0)
        },
        {
            type: 'pic_sysphoto',
            name: string().desc('标签名'),
            key: string().desc('标签key'),
            sub_button: array().length(0)
        },
        {
            type: 'pic_photo_or_album',
            name: string().desc('标签名'),
            key: string().desc('标签key'),
            sub_button: array().length(0)
        },
        {
            type: 'pic_weixin',
            name: string().desc('标签名'),
            key: string().desc('标签key'),
            sub_button: array().length(0)
        },
        {
            type: 'location_select',
            name: string().desc('标签名'),
            key: string().desc('标签key')
        },
        {
            type: 'media_id',
            name: string().desc('标签名'),
            media_id: string().desc('调用新增永久素材接口返回的合法media_id')
        },
        {
            type: 'view_limited',
            name: string().desc('标签名'),
            media_id: string().desc('调用新增永久素材接口返回的合法media_id')
        })
)

const response = object().properties({
    menu: object().properties({
        button: array().item(
            oneOf(
                {
                    type: 'click',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'view',
                    name: string().desc('标签名'),
                    url: string().desc('url'),
                    sub_button: array().length(0)
                },
                {
                    type: 'miniprogram',
                    name: string().desc('标签名'),
                    url: string().desc('url'),
                    appid: string().desc('小程序id'),
                    pagepath: string().desc('小程序的页面路径')
                },
                {
                    type: 'scancode_waitmsg',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'scancode_push',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_sysphoto',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_photo_or_album',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_weixin',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'location_select',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'media_id',
                    name: string().desc('标签名'),
                    media_id: string().desc('调用新增永久素材接口返回的合法media_id')
                },
                {
                    type: 'view_limited',
                    name: string().desc('标签名'),
                    media_id: string().desc('调用新增永久素材接口返回的合法media_id')
                },
                {
                    name: string().desc('菜单名'),
                    sub_button: subButton
                }
            )
        ),
        menuid: string().desc('菜单id')
    }).require('button'),
    conditionalmenu: array().item({
        button: array().item(
            oneOf(
                {
                    type: 'click',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'view',
                    name: string().desc('标签名'),
                    url: string().desc('url'),
                    sub_button: array().length(0)
                },
                {
                    type: 'miniprogram',
                    name: string().desc('标签名'),
                    url: string().desc('url'),
                    appid: string().desc('小程序id'),
                    pagepath: string().desc('小程序的页面路径')
                },
                {
                    type: 'scancode_waitmsg',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'scancode_push',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_sysphoto',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_photo_or_album',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'pic_weixin',
                    name: string().desc('标签名'),
                    key: string().desc('标签key'),
                    sub_button: array().length(0)
                },
                {
                    type: 'location_select',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'media_id',
                    name: string().desc('标签名'),
                    media_id: string().desc('调用新增永久素材接口返回的合法media_id')
                },
                {
                    type: 'view_limited',
                    name: string().desc('标签名'),
                    media_id: string().desc('调用新增永久素材接口返回的合法media_id')
                },
                {
                    name: string().desc('菜单名'),
                    sub_button: subButton
                }
            )
        ),
        matchrule: object().properties({
            tag_id: string().desc('用户标签的id'),
            sex: integer().enum(1, 2).desc('性别'),
            country: string().desc('国家信息'),
            province: string().desc('省份信息'),
            city: string().desc('城市信息'),
            client_platform_type: integer().enum(1, 2, 3).desc('客户端版本'),
            language: string().desc('语言信息')
        }),
        menuid: string().desc('菜单id') 
    })
}).require('menu');



module.exports = {info, request, response};