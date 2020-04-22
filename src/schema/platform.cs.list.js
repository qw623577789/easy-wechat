const {array, object, string, integer, empty, oneOf} = require('@qtk/schema').schema;

const info = {
    title: "公众号-列出所有客服",
    description: ""
};

const request = empty();

const response = array(
    object().properties({
        account: string()
            .pattern(/^(.*)@(.*)$/)
            .desc('完整客服帐号，格式为：帐号前缀@公众号微信号'),
        nickname: string().desc('客服昵称'),
        id: integer().desc('客服id'),
        avatar: string().desc('客服头像'),
        wx: string().desc('如果客服帐号已绑定了客服人员微信号， 则此处显示微信号'),
        inviteWx: string().desc('如果客服帐号尚未绑定微信号，但是已经发起了一个绑定邀请， 则此处显示绑定邀请的微信号'),
        inviteExpireTime: integer().desc('如果客服帐号尚未绑定微信号，但是已经发起过一个绑定邀请， 邀请的过期时间，为unix 时间戳'),
        inviteStatus: string()
            .desc('邀请的状态，有等待确认“waiting”，被拒绝“rejected”， 过期“expired”')
            .enum('waiting', 'rejected', 'expired'),
    }).require(
        'account',
        'nickname',
        'id',
        'avatar',
    )
);

module.exports = {info, request, response};