const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "小程序-模板消息推送",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    templateId: string().desc('模板id'),
    formId: string().desc('表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id'),
    modelData: object(),
    emphasisKeyword: string().desc('放大的关键词'),
    wxAppPagePath: string().desc('模板跳转链接'),
    color: string().desc('模板内容字体颜色')
}).require('openId', 'templateId', 'modelData', 'formId')

const response =　empty()

module.exports = {info, request, response};