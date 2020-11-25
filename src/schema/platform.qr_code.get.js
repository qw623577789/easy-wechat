const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: "公众号-获取带参数二维码",
    description: ""
};

const request = object().properties({
    scene: oneOf(string().minLength(1).maxLength(64).desc('场景值 scene_str'), integer().desc('场景值 scene_id')),
    permanent: boolean().desc('是否为永久二维码, 默认否'),
    expireSeconds: integer().max(2592000).desc('该二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。')
}).require('scene')

const response = string('二维码url');

module.exports = { info, request, response };