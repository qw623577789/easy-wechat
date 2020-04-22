const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－外部图文",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    title: string().desc('图文标题'),
    description: string().desc('描述'),
    url: string().desc('图文消息被点击后跳转的链接'),
    picUrl: string().desc('图文消息的图片链接'),
    kfAccount: string().desc('客服id')
}).require(
    'openId', 
    'title',
    'description',
    'url',
    'picUrl'
)

const response =　empty()

module.exports = {info, request, response};