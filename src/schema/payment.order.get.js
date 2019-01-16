const {array, object, string, integer, oneOf, boolean} = require('semantic-schema').schema;

const info = {
    title: "支付-查询订单",
    description: ""
};

const request = oneOf(
    object().properties({
        wechatOrderId: string().desc('微信订单号'),
        signType: string().enum('SHA256', 'MD5').desc('签名类型')
    }).required('wechatOrderId'),
    object().properties({
        orderId: string().pattern(/[A-Za-z0-9\_\-\|\*]{0,32}/).desc('商户订单号'),
        signType: string().enum('SHA256', 'MD5').desc('签名类型')
    }).required('orderId'),
)

const response = oneOf(
    object().properties({
        appId: string().desc('调用接口提交的公众账号ID'),
        mchId: string().desc('调用接口提交的商户号'),
        nonceStr: string().desc('随机字符串'),
        sign: string().desc('签名值'),
        openId: string().desc('用户微信号'),
        resultCode: string().enum('SUCCESS').desc('业务结果'),
        orderId: string().pattern(/[A-Za-z0-9\_\-\|\*]{0,32}/).desc('商户订单号'), 
        tradeState: string().enum('SUCCESS').desc('交易类型'),
        tradeType: string().enum('JSAPI', 'NATIVE', 'APP').desc('交易类型'), 
        bankType: string().desc('付款银行'),
        totalFee: integer().min(0).desc('标价金额(单位:分)'), 
        settlementTotalFee: integer().min(0).desc('应结订单金额(单位:分)'), 
        cashFee: integer().min(0).desc('现金支付金额(单位:分)'), 
        wechatOrderId: string().desc('微信订单号'),
        timeEnd: string().desc('支付完成时间(yyyyMMddHHmmss)'),
        tradeStateDesc: string().desc('交易状态描述'),
        feeType: string().desc('标价币种'),
        cashFeeType: string().desc('现金支付币种'),
        couponFee: integer().min(0).desc('代金券金额'),
        couponCount: integer().min(0).desc('代金券使用数量'),
        coupon: array().item({
            type: string().enum('CASH', 'NO_CASH').desc('商品简单描述'), 
            id: string().desc('代金券ID'),
            fee: integer().min(0).desc('代金券金额'),
        }),
        attach: string().desc('附加数据'),  
        isSubscribe: boolean().desc('是否关注公众账号'),
        deviceInfo: string().desc('设备号')
    }).required('appId', 'mchId', 'nonceStr', 'sign', 'resultCode', 'orderId', 'tradeState', 'openId', 'tradeType', 'bankType', 'totalFee', 'cashFee', 'wechatOrderId', 'timeEnd', 'tradeStateDesc'),
    object().properties({
        appId: string().desc('调用接口提交的公众账号ID'),
        mchId: string().desc('调用接口提交的商户号'),
        nonceStr: string().desc('随机字符串'),
        sign: string().desc('签名值'),
        openId: string().desc('用户微信号'),
        resultCode: string().enum('SUCCESS', 'FAIL').desc('业务结果'),
        tradeState: string().enum('REFUND', 'NOTPAY', 'CLOSED', 'REVOKED', 'USERPAYING', 'PAYERROR').desc('交易类型'),
        attach: string().desc('附加数据'),  
    }).required('appId', 'mchId', 'nonceStr', 'sign', 'resultCode', 'orderId', 'tradeState')
)

module.exports = {info, request, response};