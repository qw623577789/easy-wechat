const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－音乐",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    title: string().desc('音乐标题'),
    description: string().desc('音乐描述'),
    thumbMediaId: string().desc('媒体图片资源id'),
    musicUrl: string().desc('音乐链接'),
    hqMusicUrl: string().desc('高品质音乐链接'),
    kfAccount: string().desc('客服id')
}).require(
    'openId', 
    'title', 
    'description', 
    'thumbMediaId',
    'musicUrl',
    'hqMusicUrl'
)

const response =　empty()

module.exports = {info, request, response};