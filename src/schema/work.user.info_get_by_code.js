const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过前端显式授权获得的code获取用户信息',
    description: '获取访问用户身份'
};

const request = string().desc('前端授权得到的code');

const response = object().properties({
    deviceId: string().desc('设备id'),
    userId: string().desc('企业成员userId,企业成员访问时才有'),
    openId: string().desc('用户微信id，非企业成员访问时的标识，对当前企业唯一'),
    enterpriseCustomerUserId: string().desc('企业的客户id，当且仅当用户是企业的客户，且跟进人在应用的可见范围内时返回。如果是第三方应用调用，针对同一个客户，同一个服务商不同应用获取到的id相同'),
    authUserTicket: string().desc('scope为snsapi_userinfo或snsapi_privateinfo，且用户在应用可见范围之内时返回此参数。后续利用该参数可以获取用户信息或敏感信息')
}).require('deviceId')

module.exports = { info, request, response };