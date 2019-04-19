const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-设置菜单",
    description: ""
};

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
            url: string().desc('url')
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
            key: string().desc('标签key')
        },
        {
            type: 'scancode_push',
            name: string().desc('标签名'),
            key: string().desc('标签key')
        },
        {
            type: 'pic_sysphoto',
            name: string().desc('标签名'),
            key: string().desc('标签key')
        },
        {
            type: 'pic_photo_or_album',
            name: string().desc('标签名'),
            key: string().desc('标签key')
        },
        {
            type: 'pic_weixin',
            name: string().desc('标签名'),
            key: string().desc('标签key')
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

const request = {
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
                    url: string().desc('url')
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
                    key: string().desc('标签key')
                },
                {
                    type: 'pic_sysphoto',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'pic_photo_or_album',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
                },
                {
                    type: 'pic_weixin',
                    name: string().desc('标签名'),
                    key: string().desc('标签key')
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
        )
}

const response =　empty()

module.exports = {info, request, response};