const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-删除客服",
    description: ""
};

const request = {
    account: string()
        .pattern(/^(.*)@(.*)$/)
        .desc('完整客服帐号，格式为：帐号前缀@公众号微信号')
};

const response = empty();

module.exports = {info, request, response};