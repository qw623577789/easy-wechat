const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-发送客服消息－视频",
    description: ""
};

const request = object().properties({
    openId: string().desc('用户微信openId'),
    mediaId: string().desc('视频资源id'),
    thumbMediaId: string().desc('视频图片资源id'),
    title: string().desc('视频标题'),
    description: string().desc('视频描述'),
    kfAccount: string().desc('客服id')
}).require(
    'openId', 
    'mediaId',
    'thumbMediaId',
    'title',
    'description'
)

const response =　empty()

module.exports = {info, request, response};