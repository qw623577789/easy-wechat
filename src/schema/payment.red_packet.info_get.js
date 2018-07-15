const {array, object, string, integer} = require('semantic-schema').schema;

const info = {
    title: "支付-获取已经发放红包的信息",
    description: ""
};

const request = object().properties({
    orderId: string().pattern(/[A-Za-z0-9]{0,32}/).desc('商户订单号'), 
    signType: string().enum('SHA256', 'MD5').desc('签名类型'),
}).required('orderId')

const response = object().properties({
    orderId: string().desc('商户订单号'),
    mchId: string().desc('调用接口提交的商户号'),
    appId: string().desc('公众账号'),
    resultCode: string().enum('SUCCESS', 'FAIL').desc('业务结果'),
    money: integer().desc('红包总金额'),
    amount: integer().desc('红包个数').min(0),
    sendTime: string().desc('红包发送时间'),
    redPacketId: string().desc('红包id'),
    errCode: string().desc('错误代码'),
    errCodeDes: string().desc('错误代码描述'),
    sign: string().desc('签名'),
    type: string().desc('红包类型').enum('GROUP', 'NORMAL').desc('GROUP:裂变红包, NORMAL:普通红包'),
    sendType: string().enum('API', 'UPLOAD', 'ACTIVITY').desc('API:通过API接口发放,UPLOAD:通过上传文件方式发放,ACTIVITY:通过活动方式发放'),
    status: string().enum('SENDING', 'SENT', 'RECEIVED', 'RFUND_ING', 'REFUND').desc('红包状态,SENDING:发放中,SENT:已发放待领取,FAILED：发放失败,RECEIVED:已领取,RFUND_ING:退款中,REFUND:已退款'),
    wishing: string().desc('红包祝福语'), 
    activityName: string().desc('活动名称'), 
    remark: string().desc('备注'),  
    reason: string().desc('失败原因'),
    refundTime: string().desc('红包退款时间'),
    refundMoney: integer().min(0).desc('红包退款金额'),
    redPacketList: array().item({
        openId: string().desc('用户id'),
        money: integer().desc('红包金额'),
        receiveTime: string().desc('红包接受时间')
    })
})
    .if.properties({resultCode: 'SUCCESS', type: 'GROUP'})
    .then.required('orderId', 'mchId', 'appId', 'resultCode', 'money', 'amount', 'sendTime', 'redPacketId', 'sign', 'type', 'sendType', 'status', 'wishing', 'redPacketList')
    .elseIf.properties({resultCode: 'SUCCESS', type: 'NORMAL'})
    .then.required('orderId', 'mchId', 'appId', 'resultCode', 'money', 'amount', 'sendTime', 'redPacketId', 'sign', 'type', 'sendType', 'status', 'wishing')
    .else
    .required('errCode', 'errCodeDes', 'sign', 'resultCode')
    .endIf
module.exports = {info, request, response};