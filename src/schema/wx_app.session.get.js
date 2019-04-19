const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "小程序-临时登录凭证code",
    description: "获取sessionKey,openId"
};

const request = string().desc('临时登录凭证')

const response =　object().properties({
    openId: string().desc('用户微信id'),
    sessionKey: string().desc('会话密钥'),
    unionId: string().desc('unionId')
}).require('openId', 'sessionKey')


module.exports = {info, request, response};