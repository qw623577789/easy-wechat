const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: '企业微信-临时资源上传',
    description: ''
};

const request = object({
    type: string()
        .enum('video', 'image', 'voice', 'file')
        .desc('媒体类型'),
    resourceBase64: string().desc('base64头像'),
    filename: string().desc('文件名，需要带后缀')
})
    .require('type', 'resourceBase64', 'filename');

const response = object({
    type: string()
        .enum('video', 'image', 'voice', 'file')
        .desc('媒体类型'),
    mediaId: string().desc('资源id')
})
    .requireAll();

module.exports = {info, request, response};