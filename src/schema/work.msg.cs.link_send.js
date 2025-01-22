const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－图文链接',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    url: string().desc('页面路径'),
    description: string().desc('消息描述'),
    title: string().desc('消息标题'),
    thumbMediaId: string().desc('消息封面的mediaid'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'url', 'title', 'thumbMediaId');

const response = string().desc('消息id')

module.exports = { info, request, response };