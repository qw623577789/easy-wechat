const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－使用文本回复消息事件',
    description: ''
};

const request = object().properties({
    code: string().desc('事件响应消息对应的code，位于聊天记录列表'),
    msgId: string().desc('指定消息id'),
    text: string().desc('发送文本'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'text');

const response = string().desc('消息id')

module.exports = { info, request, response };