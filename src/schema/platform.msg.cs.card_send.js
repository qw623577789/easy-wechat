const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－卡券",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    cardId: string().desc('卡券id'),
    kfAccount: string().desc('客服id')
}).require('openId', 'cardId')

const response =　empty()

module.exports = {info, request, response};