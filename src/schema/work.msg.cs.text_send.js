const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－文本',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    text: string().desc('发送文本'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'text');

const response = string().desc('消息id')

module.exports = { info, request, response };