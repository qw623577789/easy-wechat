const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过手机号转成企业微信的userid',
    description: ''
};

const request = string().desc('微信支付openId');

const response = string().desc('企业用户id');

module.exports = { info, request, response };