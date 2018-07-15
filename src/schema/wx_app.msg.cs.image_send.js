const {array, object, string, integer, empty, oneOf} = require('semantic-schema').schema;

const info = {
    title: "小程序-发送客服消息－图片",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    mediaId: string().desc('媒体id')
}).required('openId', 'mediaId')

const response =　empty()

module.exports = {info, request, response};