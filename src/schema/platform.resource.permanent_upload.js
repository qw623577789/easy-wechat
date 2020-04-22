const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-永久资源上传",
    description: ""
};

const request = object({
    type: string()
        .enum('video', 'image', 'voice', 'thumb')
        .desc('媒体类型'),
    resourceBase64: string().desc('base64头像'),
    filename: string().desc('文件名,需要带后缀名'),
    videoTitle: string().desc('视频素材的标题'),
    videoIntroduction: string().desc('视频素材的描述')
})
    .if.properties({type: 'video'})
    .then.require('type', 'resourceBase64', 'videoTitle', 'videoIntroduction', 'filename')
    .else.require('type', 'resourceBase64', 'filename')
    .endIf;

const response = object({
    type: string()
        .enum('video', 'image', 'voice', 'thumb')
        .desc('媒体类型'),
    mediaId: string().desc('资源id'),
    url: string().desc('图片资源url')
})
    .if.properties({type: 'image'})
    .then.require('type', 'mediaId', 'url')
    .else.require('type', 'mediaId')
    .endIf;

module.exports = {info, request, response};