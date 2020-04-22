const {array, object, string, integer, boolean, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-设置客服输入状态",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    typing: boolean().desc('输入状态，默认为true'),
    kfAccount: string().desc('客服id')
}).require('openId')

const response =　empty()

module.exports = {info, request, response};