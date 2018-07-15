const {array, object, string, integer, empty, oneOf} = require('semantic-schema').schema;

const info = {
    title: "公众号-通过前端显式授权获得的accessToken获取用户信息",
    description: "scope为 snsapi_userinfo"
};

const request = {
    accessToken: string().desc('前端授权得到的accessToken'),
    openId: string().desc('用户微信id')
}

const response =　object().properties({
    openId: string().desc('用户微信id'),
    nickName: string().desc('用户昵称'),
    gender: integer().enum(0, 1, 2).desc('用户的性别，值为1时是男性，值为2时是女性，值为0时是未知'),
    province: string().desc('省份'),
    city: string().desc('城市'),
    country: string().desc('国家'),
    avatarUrl: string().desc('头像url'),
    privilege: array().item(string()).desc('用户特权信息'),
    unionId: string().desc('unionId')
}).required('openId', 'nickName', 'gender', 'country', 'province', 'city', 'avatarUrl')

module.exports = {info, request, response};