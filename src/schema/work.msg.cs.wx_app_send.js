const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－小程序',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    wxAppId: string().desc('小程序appid'),
    wxAppPath: string().desc('点击消息卡片后的小程序页面'),
    title: string().desc('消息标题'),
    thumbMediaId: string().desc('小程序消息封面的mediaid'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'wxAppId', 'wxAppPath', 'thumbMediaId');

const response = string().desc('消息id')

module.exports = { info, request, response };