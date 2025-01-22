const { array, object, string, integer } = require('@qtk/schema').schema;

const info = {
    title: "商家转账-撤销转账",
    description: ""
};

const request = string().desc('商户单号');

const response = object().properties({
    outBillNo: string().desc('商户单号'),
    transferBillNo: string().desc('微信转账单号'),
    updateTime: string().desc('最后一次单据状态变更时间-MM-DDThh:mm:ss+TIMEZONE'),
    state: string().desc('单据状态'),
})
    .requireAll()
module.exports = { info, request, response };