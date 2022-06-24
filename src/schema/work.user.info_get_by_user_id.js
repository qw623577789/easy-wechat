const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过企业用户id获取用户信息',
    description: ''
};

const request = string().desc('企业用户id');

const response = object().properties({
    userId: string().desc('企业用户id'),
    status: integer().enum(1, 2, 4, 5).desc('激活状态: 1=已激活，2=已禁用，4=未激活，5=退出企业。'),
    qrCode: string().desc('员工个人二维码，扫描可添加为外部联系人(注意返回的是一个url，可在浏览器上打开该url以展示二维码)'),
    unionUserId: string().desc('open_userid,全局唯一。对于同一个服务商，不同应用获取到企业内同一个成员的open_userid是相同的'),
    name: string().desc('用户昵称'),
    mobile: string().desc('手机号码'),
    department: array(integer().desc('成员所属部门id列表')),
    order: array(integer().desc('部门内的排序值，默认为0。数量必须和department一致，数值越大排序越前面')),
    position: string().desc('职务信息'),
    gender: integer().enum(0, 1, 2).desc('用户的性别,值为1时是男性,值为2时是女性,值为0时是未知'),
    email: string().desc('email'),
    bizEmail: string().desc('企业邮箱'),
    isLeaderInDept: array(integer().desc('0:不是，1：是；表示在所在的部门内是否为部门负责人，数量与department一致')),
    directLeaderUserId: array(string().desc('直属上级UserID，返回在应用可见范围内的直属上级列表，最多有五个直属上级')),
    avatar: string().desc('头像url'),
    thumbAvatar: string().desc('头像缩略图url'),
    telephone: string().desc('座机'),
    alias: string().desc('别名'),
    address: string().desc('地址'),
    mainDepartment: integer().desc('主部门id'),
    externalProfile: object().desc('成员对外属性'),
    externalPosition: string().desc('对外职务'),
    extAttr: object().desc('扩展属性'),
}).require('userId', 'status', 'name');

module.exports = { info, request, response };