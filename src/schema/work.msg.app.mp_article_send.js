const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送应用消息－图文消息',
    description: ''
};

const request = object().properties({
    toUserIds: array(string().desc('企业用户id')),
    toParty: array(string().desc('指定接收消息的部门')),
    toTag: array(string().desc('指定接收消息的标签')),
    safe: boolean().desc('是否是保密消息, 默认可对外分享'),
    articles: array(
        object({
            title: string().desc('标题'),
            thumbMediaId: string().desc('图文消息缩略图的media_id'),
            description: string().desc('描述'),
            author: string().desc('	图文消息的作者'),
            contentSourceUrl: string().desc('图文消息点击“阅读原文”之后的页面链接'),
            content: string().desc('图文消息的内容，支持html标签'),
            digest: string().desc('图文消息的描述')
        })
            .additionalProperties(false)
            .require('title', 'thumbMediaId', 'content')
    )
        .minItems(1)
        .maxItems(8),
    enableIdTrans: boolean().desc('是否开启id转译,默认是'),
    enableDuplicateCheck: boolean().desc('是否开启重复消息检查,默认否'),
    duplicateCheckInterval: integer().desc('表示是否重复消息检查的时间间隔，默认1800s')
})
    .additionalProperties(false)
    .require('articles')
    .desc('touser、toparty、totag不能同时为空');

const response = empty()

module.exports = { info, request, response };