const {array, object, string, integer, oneOf, boolean} = require('semantic-schema').schema;

const info = {
    title: "支付-退款",
    description: ""
};

const request = oneOf(
    object().properties({
        id: string().pattern(/[A-Za-z0-9\_\-\|\*|\@]{0,64}/).desc('退款订单号'),
        wechatOrderId: string().desc('微信订单号'),
        orderFee: integer().min(1).desc('订单金额'), 
        refundFee: integer().min(1).desc('退款金额'), 
        feeType: string().desc('退款货币种类'), 
        signType: string().enum('SHA256', 'MD5').desc('签名类型'), 
        reason: string().maxLength(80).desc('退款原因'),
        refundAccount: string().desc('退款资金来源')
    })
        .required('id', 'wechatOrderId', 'orderFee', 'refundFee'),
    object().properties({
        id: string().pattern(/[A-Za-z0-9\_\-\|\*|\@]{0,64}/).desc('退款订单号'),
        orderId: string().pattern(/[A-Za-z0-9\_\-\|\*|\@]{0,32}/).desc('商户订单号'),
        orderFee: integer().min(1).desc('订单金额'), 
        refundFee: integer().min(1).desc('退款金额'), 
        feeType: string().desc('退款货币种类'), 
        signType: string().enum('SHA256', 'MD5').desc('签名类型'), 
        reason: string().maxLength(80).desc('退款原因'),
        refundAccount: string().desc('退款资金来源')
    })
        .required('id', 'orderId', 'orderFee', 'refundFee')
)     

const response = object().properties({
    id: string().pattern(/[A-Za-z0-9\_\-\|\*|\@]{0,64}/).desc('退款订单号'),
    sign: string().length(32).desc('签名'),
    resultCode: string().enum('SUCCESS', 'FAIL').desc('业务结果'),
    errCode: string().length(32).desc('错误代码'),
    errCodeDes: string().length(128).desc('错误代码描述'),
    orderId: string().pattern(/[A-Za-z0-9\_\-\|\*|\@]{0,32}/).desc('商户订单号'),
    wechatOrderId: string().desc('微信订单号'),
    nonceStr: string().desc('随机字符串'),
    mchId: string().desc('调用接口提交的商户号'),
    wechatRefundId: string().desc('微信退款单号'),
    appId: string().desc('调用接口提交的公众账号ID'),
    orderFee: integer().min(1).desc('订单金额'), 
    refundFee: integer().min(1).desc('退款金额'),
    cashFee: integer().min(0).desc('现金支付金额(单位:分)'), 

    settlementRefundFee: integer().min(0).desc('应结退款金额(单位:分)'),
    settlementTotalFee: integer().min(0).desc('应结订单金额(单位:分)'),
    feeType: string().desc('标价币种'), 
    cashFeeType: string().desc('现金支付币种'), 
    cashRefundFee: integer().min(0).desc('现金退款金额(单位:分)'),
    couponRefundFee: integer().min(0).desc('代金券退款总金额(单位:分)'),
    couponRefundCount: integer().min(0).desc('退款代金券使用数量(单位:分)'),
    couponRefund: array().item({
        type: string().enum('CASH', 'NO_CASH').desc('商品简单描述'), 
        id: string().desc('代金券ID'),
        fee: integer().min(0).desc('代金券金额'),
    })
}).required("id", "sign", "resultCode", "orderId", "wechatOrderId", "nonceStr", "mchId", "wechatRefundId", "appId", "orderFee", "refundFee", "cashFee")

module.exports = {info, request, response};