const {array, object, string, integer, empty, oneOf, boolean} = require('semantic-schema').schema;

const info = {
    title: "公众号-检查前端用户授权ACCESS_TOKEN是否失效",
    description: ""
};

const request = {
    accessToken: string().desc('access_token'),
    openId: string().desc('用户微信id')
}

const response =　boolean().desc('是否失效')

module.exports = {info, request, response};