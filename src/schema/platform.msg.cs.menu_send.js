const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－菜单",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    head: string().desc('菜单标题'),
    list: array({
        id: string().desc('菜单id'),
        content: string().desc('菜单内容')
    }),
    tail: string().desc('菜单选择后自动回复'),
    kfAccount: string().desc('客服id')
}).require('openId', 'head', 'list', 'tail')

const response =　empty()

module.exports = {info, request, response};