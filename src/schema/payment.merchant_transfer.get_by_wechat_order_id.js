const { array, object, string, integer } = require('@qtk/schema').schema;

const info = {
    title: "商家转账-微信单号查询转账单",
    description: ""
};

const request = string().desc('微信转账单号');

const response = object().properties({
    mchId: string().desc('商户id'),
    outBillNo: string().desc('商户单号'),
    transferBillNo: string().desc('微信转账单号'),
    appId: string().desc('appId'),
    state: string().desc('单据状态'),
    money: integer().min(0).desc('转账金额(单位:分)'),
    remark: string().desc('转账备注'),
    failReason: string().desc('失败原因'),
    openId: string().desc('收款用户OpenID'),
    receiverName: string().desc('收款用户姓名'),
    createTime: string().desc('单据创建时间，格式为yyyy-MM-DDThh:mm:ss+TIMEZONE'),
    updateTime: string().desc('最后一次单据状态变更时间-MM-DDThh:mm:ss+TIMEZONE')

})
    .require(
        'mchId',
        'outBillNo',
        'transferBillNo',
        'appId',
        'state',
        'money',
        'remark',
        'createTime',
        'updateTime',
    )
module.exports = { info, request, response };