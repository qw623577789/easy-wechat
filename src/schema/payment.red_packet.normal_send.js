const {array, object, string, integer} = require('semantic-schema').schema;

const info = {
    title: "支付-发放普通红包",
    description: ""
};

const request = object().properties({
    orderId: string().pattern(/[A-Za-z0-9]{0,28}/).desc('商户订单号'), 
    senderName: string().desc('红包发送者名称'), 
    receiverOpenId: string().desc('接受红包的用户openid '), 
    money: integer().min(0).desc('金额(单位:分)'), 
    wishing: string().desc('红包祝福语'), 
    activityName: string().desc('活动名称'), 
    remark: string().desc('备注'),   
    sceneId: string().enum('PRODUCT_1' ,'PRODUCT_2' ,'PRODUCT_3' ,'PRODUCT_4' ,'PRODUCT_5' ,'PRODUCT_6' ,'PRODUCT_7' ,'PRODUCT_8').desc('PRODUCT_1:商品促销,PRODUCT_2:抽奖,PRODUCT_3:虚拟物品兑奖 ,PRODUCT_4:企业内部福利,PRODUCT_5:渠道分润,PRODUCT_6:保险回馈,PRODUCT_7:彩票派奖,PRODUCT_8:税务刮奖'), 
    riskInfo: string().desc('活动信息'), 
    consumeMchId: string().desc('资金授权商户号'),
    signType: string().enum('SHA256', 'MD5').desc('签名类型'),
}).required('orderId', 'senderName', 'receiverOpenId', 'money', 'wishing')

const response = object().properties({
    orderId: string().desc('商户订单号'),
    mchId: string().desc('调用接口提交的商户号'),
    appId: string().desc('公众账号'),
    receiveOpenId: string().desc('接受收红包的用户'),
    resultCode: string().enum('SUCCESS', 'FAIL').desc('业务结果'),
    money: integer().desc('付款金额'),
    redPacketId: string().desc('红包id'),
    errCode: string().desc('错误代码'),
    errCodeDes: string().desc('错误代码描述'),
    sign: string().desc('签名')
})
    .if.properties({resultCode: 'SUCCESS'})
    .then.required('orderId', 'mchId', 'appId', 'receiveOpenId', 'resultCode', 'money', 'redPacketId', 'sign')
    .else
    .required('errCode', 'errCodeDes', 'sign', 'resultCode')
    .endIf
module.exports = {info, request, response};