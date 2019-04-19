const {array, object, string, integer, empty, oneOf, boolean} = require('@qtk/schema').schema;

const info = {
    title: "小程序-消息合法性检查－文本",
    description: ""
};

const request = string().desc('文本');

const response = boolean();

module.exports = {info, request, response};