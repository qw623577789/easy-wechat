const {array, object, string, integer, empty, oneOf, boolean} = require('@qtk/schema').schema;

const info = {
    title: "小程序-消息合法性检查－图片",
    description: ""
};

const request = object({
    imgBase64: string().desc('base64的图片'), 
    filename: string().desc('文件名，默认为default.jpg')
})
    .require('imgBase64');

const response = boolean();

module.exports = {info, request, response};