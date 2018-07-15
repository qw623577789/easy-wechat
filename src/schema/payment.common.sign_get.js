const {array, object, string, integer} = require('semantic-schema').schema;

const info = {
    title: "支付-获取签名",
    description: ""
};

const request = object().properties({
    data: object().desc('数据集'), 
    signType: string().enum('SHA256', 'MD5').desc('签名类型')
})

const response = string().pattern(/[A-Za-z0-9]{0,}/).desc('签名');

module.exports = {info, request, response};