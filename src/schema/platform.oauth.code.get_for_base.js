const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-获取前端静默授权url",
    description: ""
};

const request = object().properties({
    redirectUrl: string().desc('授权完成后跳转的页面'),
    state: string().desc('附加数据').maxLength(128)
}).require('redirectUrl')

const response =　string().desc('网页授权url')

module.exports = {info, request, response};