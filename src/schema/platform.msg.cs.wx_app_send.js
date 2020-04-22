const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－小程序",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    title: string().desc('标题'),
    wxAppId: string().desc('小程序appId'),
    wxAppPath: string().desc('小程序路径'),
    thumbMediaId: string().desc('卡片图片资源id'),
    kfAccount: string().desc('客服id')
}).require(
    'openId', 
    'title',
    'wxAppId',
    'wxAppPath',
    'thumbMediaId'
)

const response =　empty()

module.exports = {info, request, response};