const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过企业微信的userid转成openid',
    description: '该接口使用场景为企业支付，在使用企业红包和向员工付款时，需要自行将企业微信的userid转成openid'
};

const request = string().desc('企业用户id');

const response = string().desc('微信支付openId');

module.exports = { info, request, response };