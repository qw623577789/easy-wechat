const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-前端用户授权ACCESS_TOKEN获取',
    description: ''
};

const request = empty();

const response = object().properties({
    accessToken: string().desc('应用接口调用凭证'),
    expiresIn: integer().desc('调用凭证超时时间，单位（秒）')
}).require('accessToken', 'expiresIn')

module.exports = { info, request, response };