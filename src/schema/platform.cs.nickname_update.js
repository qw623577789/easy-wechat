const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-更新客服昵称",
    description: ""
};

const request = {
    account: string()
        .pattern(/^(.*)@(.*)$/)
        .desc('完整客服帐号，格式为：帐号前缀@公众号微信号'),
    nickname: string().desc('客服昵称'),
};

const response = empty();

module.exports = {info, request, response};