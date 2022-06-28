const { array, object, string, integer, empty, oneOf } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-通过企业客户用户id获取客户信息',
    description: ''
};

const request = string().desc('企业客户id');

const response = object().properties({
    enterpriseCustomerUserId: string().desc('企业客户id'),
    name: string().desc('用户昵称'),
    position: string().desc('外部联系人的职位，如果外部企业或用户选择隐藏职位，则不返回，仅当联系人类型是企业微信用户时有此字段'),
    avatar: string().desc('外部联系人头像，代开发自建应用需要管理员授权才可以获取，第三方不可获取，上游企业不可获取下游企业客户该字段'),
    corpName: string().desc('外部联系人所在企业的简称，仅当联系人类型是企业微信用户时有此字段'),
    corpFullName: string().desc('外部联系人所在企业的主体名称，仅当联系人类型是企业微信用户时有此字段。仅企业自建应用可获取；第三方应用、代开发应用、上下游应用不可获取，返回内容为企业名称，即corp_name'),
    type: integer().enum(1, 2).desc('外部联系人的类型，1表示该外部联系人是微信用户，2表示该外部联系人是企业微信用户'),
    gender: integer().enum(0, 1, 2).desc('用户的性别,值为1时是男性,值为2时是女性,值为0时是未知'),
    wechatUnionId: string().desc('外部联系人在微信开放平台的唯一身份标识（微信unionid），通过此字段企业可将外部联系人与公众号/小程序用户关联起来。仅当联系人类型是微信用户，且企业绑定了微信开发者ID有此字段。查看绑定方法。第三方不可获取，上游企业不可获取下游企业客户的unionid字段'),
    externalProfile: object().desc('外部联系人的自定义展示信息，可以有多个字段和多种类型，包括文本，网页和小程序，仅当联系人类型是企业微信用户时有此字段'),
    followUser: array(
        object({
            userId: string().desc('此外部联系人的企业成员userid'),
            remark: string().desc('外部联系人的备注'),
            description: string().desc('外部联系人的描述'),
            createTime: integer().desc('添加此外部联系人的时间'),
            tags: array(
                object({
                    groupName: string().desc('外部联系人所打标签的分组名称'),
                    tagName: string().desc('外部联系人所打标签名称'),
                    type: integer().enum(1, 2, 3).desc('外部联系人所打标签类型, 1-企业设置，2-用户自定义，3-规则组标签（仅系统应用返回）'),
                })
                    .additionalProperties(false)
            )
                .desc('外部联系人所打标签的分组名称'),
            remarkCorpName: string().desc('该成员对此微信客户备注的企业名称（仅微信客户有该字段）'),
            remarkMobiles: array(
                string().desc('该成员对此客户备注的手机号码，代开发自建应用需要管理员授权才可以获取，第三方不可获取，上游企业不可获取下游企业客户该字段')
            ),
            operUserId: string().desc('发起添加的userid，如果成员主动添加，为成员的userid；如果是客户主动添加，则为客户的外部联系人userid；如果是内部成员共享/管理员分配，则为对应的成员/管理员userid'),
            addWay: integer().enum(1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 201, 202).desc(`
                0	未知来源
                1	扫描二维码
                2	搜索手机号
                3	名片分享
                4	群聊
                5	手机通讯录
                6	微信联系人
                8	安装第三方应用时自动添加的客服人员
                9	搜索邮箱
                10	视频号添加
                11	通过日程参与人添加
                12	通过会议参与人添加
                13	添加微信好友对应的企业微信
                14	通过智慧硬件专属客服添加
                201	内部成员共享
                202	管理员/负责人分配
            `),
            wechatChannels: object({
                nickname: string().desc('视频号名称'),
                source: integer().enum(0, 1, 2)
                    .desc('annels.source	视频号添加场景，0-未知 1-视频号主页 2-视频号直播间（微信版本要求：iOS ≥ 8.0.20，Android ≥ 8.0.21，且添加时间不早于2022年4月21日。否则添加场景值为0）')
            })
                .additionalProperties(false)
        })
            .additionalProperties(false)
            .require('userId')
    )
        .desc('添加了此外部联系人的企业成员'),
    nextCursor: string().desc('分页的cursor，当跟进人多于500人时返回'),
}).require('enterpriseCustomerUserId', 'name', 'type');

module.exports = { info, request, response };