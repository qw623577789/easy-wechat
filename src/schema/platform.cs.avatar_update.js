const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-更新客服头像",
    description: ""
};

const request = object({
    account: string()
        .pattern(/^(.*)@(.*)$/)
        .desc('完整客服帐号，格式为：帐号前缀@公众号微信号'),
    imgBase64: string().desc('base64头像'),
    filename: string().desc('头像文件名，default.jpg')
})
    .require('account', 'imgBase64');

const response = empty();

module.exports = {info, request, response};