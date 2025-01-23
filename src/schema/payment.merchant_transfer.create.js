const { array, object, string, integer } = require('@qtk/schema').schema;

const info = {
    title: "商家转账-发起转账",
    description: ""
};

const request = object().properties({
    orderId: string().desc('商户订单号'),
    sceneId: string().desc('转账场景ID'),
    openId: string().desc('收款用户OpenID'),
    receiverName: string().desc('收款用户姓名'),
    money: integer().min(0).desc('转账金额(单位:分)'),
    remark: string().desc('转账备注'),
    notifyUrl: string().desc('通知地址'),
    receivePerception: string().desc('用户收款感知'),
    reportInfos: array({
        infoType: string().desc('信息类型'),
        infoContent: string().desc('信息内容'),
    })
        .desc('转账场景报备信息')
})
    .require(
        'orderId',
        'sceneId',
        'openId',
        'money',
        'remark',
        'reportInfos',
    )

const response = object().properties({
    outBillNo: string().desc('商户单号'),
    transferBillNo: string().desc('微信转账单号'),
    createTime: string().desc('单据创建时间，格式为yyyy-MM-DDThh:mm:ss+TIMEZONE'),
    state: string().desc('单据状态'),
    failReason: string().desc('失败原因'),
    packageInfo: string().desc('跳转领取页面的package信息'),
    mchId: string().desc('商户id'),
    appId: string(),
})
    .require('outBillNo', 'transferBillNo', 'createTime', 'state', 'mchId', 'appId')
module.exports = { info, request, response };