const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "小程序-订阅消息推送",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    templateId: string().desc('模板id'),
    modelData: object(),
    wxAppPagePath: string().desc('模板跳转链接')
}).require('openId', 'templateId', 'modelData')

const response =　empty()

module.exports = {info, request, response};