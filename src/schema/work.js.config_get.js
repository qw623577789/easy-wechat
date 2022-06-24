const { array, object, string, integer } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-生成前端wx.agentConfig初始化参数',
    description: ''
};

const request = string().desc('调用页url')

const response = {
    corpId: string().desc('企业微信的corpid'),
    appId: string().desc('企业微信的应用id'),
    signature: string().desc('签名'),
    timeStamp: integer().desc('时间戳'),
    nonceStr: string().desc('随机字符串')
};

module.exports = { info, request, response };