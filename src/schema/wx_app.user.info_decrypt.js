const {array, object, string, integer, empty, oneOf} = require('semantic-schema').schema;

const info = {
    title: "小程序-用户信息解密",
    description: ""
};

const request = object().properties({
    encryptedData: string().desc('原始数据字符串'),
    iv: string().desc('加密算法的初始向量'),
    sessionKey: string().desc('登录流程获取会话密钥'),
}).required('encryptedData', 'iv', 'sessionKey')

const response =　object().properties({
    openId: string().desc('用户微信id'),
    nickName: string().desc('用户昵称'),
    gender: integer().enum(0, 1, 2).desc('用户的性别，值为1时是男性，值为2时是女性，值为0时是未知'),
    province: string().desc('省份'),
    city: string().desc('城市'),
    country: string().desc('国家'),
    avatarUrl: string().desc('头像url'),
    watermark:　{
        appId: string().desc('小程序appId'),
        timestamp: integer().desc('时间戳')
    },
    unionId: string().desc('unionId')
}).required('openId', 'nickName', 'gender', 'country', 'province', 'city', 'avatarUrl', 'watermark')


module.exports = {info, request, response};