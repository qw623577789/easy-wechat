const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送应用消息－语音',
    description: ''
};

const request = object().properties({
    toUserIds: array(string().desc('企业用户id')),
    toParty: array(string().desc('指定接收消息的部门')),
    toTag: array(string().desc('指定接收消息的标签')),
    safe: boolean().desc('是否是保密消息, 默认可对外分享'),
    mediaId: string().desc('资源id'),
    enableIdTrans: boolean().desc('是否开启id转译,默认是'),
    enableDuplicateCheck: boolean().desc('是否开启重复消息检查,默认否'),
    duplicateCheckInterval: integer().desc('表示是否重复消息检查的时间间隔，默认1800s')
})
    .additionalProperties(false)
    .require('mediaId')
    .desc('touser、toparty、totag不能同时为空');

const response = empty()

module.exports = { info, request, response };