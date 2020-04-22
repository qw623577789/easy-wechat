const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－语音",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    mediaId: string().desc('语音资源id'),
    kfAccount: string().desc('客服id')
}).require('openId', 'mediaId')

const response =　empty()

module.exports = {info, request, response};