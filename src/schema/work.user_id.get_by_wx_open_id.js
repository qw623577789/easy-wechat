const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过微信支付openid转成企业微信的userid',
    description: '该接口主要应用于使用企业支付之后的结果查询，开发者需要知道某个结果事件的openid对应企业微信内成员的信息时，可以通过调用该接口进行转换查询'
};

const request = string().desc('微信支付openId');

const response = string().desc('企业用户id');

module.exports = { info, request, response };