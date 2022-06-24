const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过授权scope为snsapi_userinfo或snsapi_privateinfo的code获取用户敏感信息',
    description: ''
};

const request = string().desc('authUserTicket');

const response = object().properties({
    userId: string().desc('企业用户id'),
    gender: string().enum('0', '1', '2').desc('用户的性别,值为1时是男性,值为2时是女性,值为0时是未知'),
    avatar: string().desc('头像url'),
    qrCode: string().desc('员工个人二维码，扫描可添加为外部联系人(注意返回的是一个url，可在浏览器上打开该url以展示二维码)'),
    mobile: string().desc('手机号码'),
    email: string().desc('email'),
    bizEmail: string().desc('企业邮箱'),
    address: string().desc('地址'),
}).require('userId', 'gender');

module.exports = { info, request, response };