const {array, object, string, integer, empty, oneOf} = require('semantic-schema').schema;

const info = {
    title: "小程序-发送客服消息－文本",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    text: string().desc('文本内容')
}).required('openId', 'text')

const response =　empty()

module.exports = {info, request, response};