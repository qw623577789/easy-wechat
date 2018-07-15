const {array, object, string, integer, empty, oneOf} = require('semantic-schema').schema;

const info = {
    title: "公众号-前端用户授权ACCESS_TOKEN获取",
    description: ""
};

const request = string().desc('前端授权得到的code')

const response =　{
    accessToken: string().desc('网页授权接口调用凭证'),
    expiresIn: integer().desc('调用凭证超时时间，单位（秒）'),
    refreshToken: string().desc('用户刷新access_token'),
    openId: string().desc('用户微信id'),
    scope: string().desc('用户授权的作用域')
}

module.exports = {info, request, response};