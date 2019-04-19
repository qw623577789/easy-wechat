const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "小程序-发送客服消息－图文",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    title: string().desc('标题'),
    description: string().desc('图文链接消息'),
    url: string().desc('跳转的链接'),
    thumbUrl: string().desc('图片url')
}).require('openId', 'title', 'description', 'url', 'thumbUrl')

const response =　empty()

module.exports = {info, request, response};