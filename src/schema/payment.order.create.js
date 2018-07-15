const {array, object, string, integer} = require('semantic-schema').schema;

const info = {
    title: "支付-创建订单",
    description: ""
};

const request = object().properties({
    orderId: string().pattern(/[A-Za-z0-9\_\-\|\*]{0,32}/).desc('商户订单号'), 
    description: string().desc('商品简单描述'), 
    detail: string().desc('商品详细描述'), 
    price: integer().min(0).desc('价格(单位:分)'), 
    tradeType: string().enum('JSAPI', 'NATIVE', 'APP').desc('交易类型'), 
    openId: string().desc('用户微信号'), 
    spbillCreateIp: string().desc('终端IP'), 
    attach: string().desc('附加数据'),  
    startTime: string().desc('交易起始时间(yyyyMMddHHmmss)'), 
    endTime: string().desc('交易结束时间(yyyyMMddHHmmss)'), 
    productId: string().desc('商品ID'), 
    feeType: string().desc('标价币种'), 
    deviceInfo: string().desc('设备号'), 
    signType: string().enum('SHA256', 'MD5').desc('签名类型'), 
    goodsTag: string().desc('订单优惠标记'), 
    limitPay: string().desc('指定支付方式'), 
    sceneInfo: string().desc('场景信息')
})
    .if.properties({tradeType: 'JSAPI'})
    .then.required('orderId', 'description', 'detail', 'price', 'tradeType', 'openId')
    .elseIf.properties({tradeType: 'NATIVE'})
    .then.required('orderId', 'description', 'detail', 'price', 'tradeType', 'productId')
    .else
    .required('orderId', 'description', 'detail', 'price', 'tradeType')
    .endIf

const response = object().properties({
    appId: string().desc('调用接口提交的公众账号ID'),
    mchId: string().desc('调用接口提交的商户号'),
    nonceStr: string().desc('随机字符串'),
    sign: string().desc('签名值'),
    resultCode: string().enum('SUCCESS', 'FAIL').desc('业务结果'),
    tradeType: string().enum('JSAPI', 'NATIVE', 'APP').desc('交易类型'),
    prepayId: string().desc('预支付交易会话标识'),
    codeUrl: string().desc('二维码链接'),
    deviceInfo: string().desc('设备号'),
})
    .if.properties({tradeType: 'NATIVE'})
    .then.required('appId', 'mchId', 'nonceStr', 'sign', 'resultCode', 'tradeType', 'prepayId', 'codeUrl')
    .else
    .required('appId', 'mchId', 'nonceStr', 'sign', 'resultCode', 'tradeType', 'prepayId')
    .endIf
module.exports = {info, request, response};