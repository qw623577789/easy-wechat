const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－视频',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    mediaId: string().desc('资源id'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'mediaId');

const response = string().desc('消息id')

module.exports = { info, request, response };