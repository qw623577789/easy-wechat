const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-模板消息推送",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    templateId: string().desc('模板id'),
    modelData: object(),
    url: string().desc('模板跳转链接'),
    wxApp: object().properties({
        appId: string().desc('小程序appId'),
        pagePath: string().desc('所需跳转到小程序的具体页面路径')
    }).desc('跳小程序所需数据'),
    color: string().desc('模板内容字体颜色')
}).require('openId', 'templateId', 'modelData')

const response =　empty()

module.exports = {info, request, response};