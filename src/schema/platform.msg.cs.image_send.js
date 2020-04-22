const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－图片",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    mediaId: string().desc('图片资源id'),
    kfAccount: string().desc('客服id')
}).require('openId', 'mediaId')

const response =　empty()

module.exports = {info, request, response};