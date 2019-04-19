const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-通过后端accessToken获取用户信息",
    description: ""
};

const request = string().desc('用户微信id');

const response =　oneOf(
    {
        openId: string().desc('用户微信id'),
        subscribe: 0
    },
    object().properties({
        openId: string().desc('用户微信id'),
        nickName: string().desc('用户昵称'),
        gender: integer().enum(0, 1, 2).desc('用户的性别,值为1时是男性,值为2时是女性,值为0时是未知'),
        province: string().desc('省份'),
        city: string().desc('城市'),
        country: string().desc('国家'),
        avatarUrl: string().desc('头像url'),
        unionId: string().desc('unionId'),
        language: string().desc('用户的语言'),
        subscribe: integer().enum(1).desc('是否订阅该公众号'),
        subscribeTime: integer().desc('最后关注时间'),
        remark: string().desc('公众号运营者对粉丝的备注'),
        groupId: integer().desc('用户所在的分组ID'),
        tagIdList: array().item(integer()).desc('用户被打上的标签ID列表'),
        subscribeTime: integer().desc('最后关注时间'),
        subscribeScene: string().enum('ADD_SCENE_SEARCH', 'ADD_SCENE_ACCOUNT_MIGRATION','ADD_SCENE_PROFILE_CARD','ADD_SCENE_QR_CODE','ADD_SCENEPROFILE LINK','ADD_SCENE_PROFILE_ITEM','ADD_SCENE_PAID','ADD_SCENE_OTHERS').desc('用户关注的渠道来源'),
        qrScene: integer().desc('二维码扫码场景'),
        qrSceneStr: string().desc('二维码扫码场景描述')
    }).require('openId', 'nickName', 'gender', 'country', 'province', 'city', 'avatarUrl', 'subscribe', 'subscribeTime', 'subscribeScene')
)
module.exports = {info, request, response};