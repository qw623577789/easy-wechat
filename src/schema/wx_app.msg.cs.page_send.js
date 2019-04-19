const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "小程序-发送客服消息－小程序卡片",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    title: string().desc('标题'),
    wxAppPath: string().desc('小程序的页面路径'),
    thumbMediaId: string().desc('小程序消息卡片的封面媒体id')
}).require('openId', 'title', 'wxAppPath', 'thumbMediaId')

const response =　empty()

module.exports = {info, request, response};