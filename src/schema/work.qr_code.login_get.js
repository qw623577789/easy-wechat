const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-获取网页扫码登录url',
    description: ''
};

const request = object().properties({
    redirectUrl: string().desc('授权完成后跳转的页面'),
    state: string().desc('附加数据').maxLength(128)
}).require('redirectUrl');

const response = string().desc('独立窗口登录二维码url');

module.exports = { info, request, response };