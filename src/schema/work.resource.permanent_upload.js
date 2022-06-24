const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-永久资源上传',
    description: ''
};

const request = object({
    type: string()
        .enum('image')
        .desc('媒体类型'),
    resourceBase64: string().desc('base64头像'),
    filename: string().desc('文件名,需要带后缀名')
})
    .requireAll()
    .additionalProperties(false);

const response = object({
    type: string()
        .enum('image')
        .desc('媒体类型'),
    url: string().desc('图片资源url')
})
    .requireAll()
    .additionalProperties(false);

module.exports = { info, request, response };