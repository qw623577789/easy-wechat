const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送应用消息－小程序',
    description: ''
};

const request = object().properties({
    toUserIds: array(string().desc('企业用户id')),
    toParty: array(string().desc('指定接收消息的部门')),
    toTag: array(string().desc('指定接收消息的标签')),
    safe: boolean().desc('是否是保密消息, 默认可对外分享'),
    wxAppId: string().desc('小程序appid'),
    wxAppPath: string().desc('点击消息卡片后的小程序页面'),
    description: string().desc('消息描述'),
    title: string().desc('消息标题'),
    emphasisFirstItem: boolean().desc('是否放大第一个content_item'),
    contentItem: array(
        {
            key: string().desc('消息内容键'),
            value: string().desc('消息内容值'),
        }
    )
        .maxItems(10)
        .minItems(1),
    enableIdTrans: boolean().desc('是否开启id转译,默认是'),
    enableDuplicateCheck: boolean().desc('是否开启重复消息检查,默认否'),
    duplicateCheckInterval: integer().desc('表示是否重复消息检查的时间间隔，默认1800s')
})
    .additionalProperties(false)
    .require('wxAppId', 'title')
    .desc('touser、toparty、totag不能同时为空');

const response = empty()

module.exports = { info, request, response };