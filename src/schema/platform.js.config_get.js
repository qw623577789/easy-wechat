const {array, object, string, integer} = require('semantic-schema').schema;

const info = {
    title: "公众号-生成前端jsApi初始化参数",
    description: ""
};

const request = string().desc('调用页url')

const response = {
    appId: string().desc('调用接口提交的公众账号ID'),
    signature: string().desc('签名'),
    timeStamp: integer().desc('时间戳'),
    nonceStr: string().desc('随机字符串')
};

module.exports = {info, request, response};