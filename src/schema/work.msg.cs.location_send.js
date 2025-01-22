const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-发送客服消息－地理位置',
    description: ''
};

const request = object().properties({
    toUserId: string().desc('咨询者id'),
    kfId: string().desc('指定客服id'),
    msgId: string().desc('指定消息id'),
    name: string().desc('位置名'),
    address: string().desc('地址详情说明'),
    latitude: string().desc('纬度，浮点数，范围为90 ~ -90'),
    longitude: string().desc('经度，浮点数，范围为180 ~ -180'),
})
    .additionalProperties(false)
    .require('toUserId', 'kfId', 'latitude', 'longitude');

const response = string().desc('消息id')

module.exports = { info, request, response };