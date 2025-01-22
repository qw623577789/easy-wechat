const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－菜单',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    head: string().desc('起始文本'),
    list: array(
        oneOf(
            object({
                type: 'click',
                click: {
                    id: string().desc('菜单id'),
                    content: string().desc('菜单显示内容'),
                }
            })
                .additionalProperties(false)
                .requireAll()
                .desc('click-回复菜单'),
            object({
                type: 'view',
                view: {
                    url: string().desc('点击后跳转的链接'),
                    content: string().desc('菜单显示内容'),
                }
            })
                .additionalProperties(false)
                .requireAll()
                .desc('view-超链接菜单'),
            object({
                type: 'miniprogram',
                miniProgram: {
                    appId: string().desc('小程序appid'),
                    pagePath: string().desc('点击后进入的小程序页面'),
                    content: string().desc('菜单显示内容'),
                }
            })
                .additionalProperties(false)
                .requireAll()
                .desc('miniprogram-小程序菜单'),
            object({
                type: 'text',
                text: {
                    content: string().desc('文本内容，支持\n（\和n两个字符）换行'),
                    noNewline: string().enum('0', '1').desc('内容后面是否不换行，0-换行 1-不换行，默认为0'),
                }
            })
                .additionalProperties(false)
                .requireAll()
                .desc('text-文本')
        )
    )
        .desc('内容'),
    tail: string().desc('结束文本'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId');

const response = string().desc('消息id')

module.exports = { info, request, response };