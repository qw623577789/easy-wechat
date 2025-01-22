const { array, object, string, integer, empty, oneOf, boolean } = require('@qtk/schema').schema;

const info = {
    title: '企业微信-拉取客服消息',
    description: ''
};

const request = object().properties({
    cursor: string().desc('上一次调用时返回的next_cursor，第一次拉取可以不填。若不填，从3天内最早的消息开始返回'),
    token: string().desc('回调事件返回的token字段，10分钟内有效；可不填，如果不填接口有严格的频率限制'),
    limit: integer().desc(`期望请求的数据量，默认值和最大值都为1000。
    注意：可能会出现返回条数少于limit的情况，需结合返回的has_more字段判断是否继续请求`),
    kfId: string().desc('指定客服id'),
    voiceFormat: integer().desc('语音消息类型，0-Amr 1-Silk，默认0。可通过该参数控制返回的语音格式')
})
    .additionalProperties(false);

const response = object({
    nextCursor: string().desc('下次调用带上该值，则从当前的位置继续往后拉，以实现增量拉取'),
    hasMore: integer().desc(`是否还有更多数据。0-否；1-是。
    不能通过判断msg_list是否空来停止拉取，可能会出现has_more为1，而msg_list为空的情况`),
    list: array(
        object({
            msgId: string().desc('消息ID'),
            kfId: string().desc('客服帐号ID（msgtype为event，该字段不返回）'),
            customerWechatUserId: string().desc('客户UserID（msgtype为event，该字段不返回）'),
            sendTime: integer().desc('消息发送时间'),
            origin: integer().enum(3, 4, 5).desc('消息来源。3-微信客户发送的消息 4-系统推送的事件消息 5-接待人员在企业微信客户端发送的消息'),
            servicerUserId: string().desc('从企业微信给客户发消息的接待人员userid'),
            msgType: string().enum('text', 'image', 'voice', 'video', 'file', 'location', 'business_card', 'miniprogram', 'msgmenu', 'channels_shop_product', 'channels_shop_order', 'event')
                .desc('消息类型'),
            text: object({
                content: string().desc('文本内容'),
                menuId: string().desc('客户点击菜单消息，触发的回复消息中附带的菜单ID')
            })
                .require('content'),
            image: object({
                mediaId: string().desc('图片文件id')
            })
                .require('mediaId'),
            voice: object({
                mediaId: string().desc('语音文件ID')
            })
                .require('mediaId'),
            video: object({
                mediaId: string().desc('文件id')
            })
                .require('mediaId'),
            file: object({
                mediaId: string().desc('文件id')
            })
                .require('mediaId'),
            location: object({
                name: string().desc('位置名'),
                address: string().desc('地址详情说明'),
                latitude: string().desc('纬度，浮点数，范围为90 ~ -90'),
                longitude: string().desc('经度，浮点数，范围为180 ~ -180'),
            })
                .require('latitude', 'longitude'),
            businessCard: object({
                userid: string().desc('名片userid')
            })
                .require('userid'),
            miniProgram: object({
                appid: string().desc('小程序appid'),
                pagepath: string().desc('点击消息卡片后的小程序页面'),
                title: string().desc('消息标题'),
                thumbMediaId: string().desc('小程序消息封面的mediaid'),
            })
                .require('appid', 'pagepath', 'thumbMediaId'),
            msgMenu: object({
                headContent: string().desc('起始文本'),
                list: array(
                    oneOf(
                        object({
                            type: 'click',
                            click: {
                                id: string().desc('菜单id'),
                                content: string().desc('菜单显示内容'),
                            }
                        })
                            .additionalProperties(false)
                            .requireAll()
                            .desc('click-回复菜单'),
                        object({
                            type: 'view',
                            view: {
                                url: string().desc('点击后跳转的链接'),
                                content: string().desc('菜单显示内容'),
                            }
                        })
                            .additionalProperties(false)
                            .requireAll()
                            .desc('view-超链接菜单'),
                        object({
                            type: 'miniprogram',
                            miniProgram: {
                                appid: string().desc('小程序appid'),
                                pagepath: string().desc('点击后进入的小程序页面'),
                                content: string().desc('菜单显示内容'),
                            }
                        })
                            .additionalProperties(false)
                            .requireAll()
                            .desc('miniprogram-小程序菜单'),
                        object({
                            type: 'text',
                            text: {
                                content: string().desc('文本内容，支持\n（\和n两个字符）换行'),
                                noNewline: string().enum('0', '1').desc('内容后面是否不换行，0-换行 1-不换行，默认为0'),
                            }
                        })
                            .additionalProperties(false)
                            .requireAll()
                            .desc('text-文本')
                    )
                )
                    .desc('内容'),
                tail: string().desc('结束文本'),
            })
                .additionalProperties(false),
            channelsShopProduct: object({
                productId: string().desc('商品ID'),
                headImg: string().desc('商品图片'),
                title: string().desc('商品标题'),
                salesPrice: string().desc('商品价格，以分为单位'),
                shopNickname: string().desc('店铺名称'),
                shopHeadImg: string().desc('店铺头像'),
            }),
            channelsShopOrder: object({
                orderId: string().desc('订单号'),
                productTitles: string().desc('商品标题'),
                priceWording: string().desc('订单价格描述'),
                state: string().desc('订单状态'),
                imageUrl: string().desc('订单缩略图'),
                shopNickname: string().desc('店铺名称'),
            }),
            event: oneOf(
                object({
                    eventType: 'enter_session',
                    openKfid: string().desc('客服帐号ID'),
                    externalUserid: string().desc('客户UserID'),
                    scene: string().desc('	进入会话的场景值，获取客服帐号链接开发者自定义的场景值'),
                    sceneParam: string().desc('进入会话的自定义参数，获取客服帐号链接返回的url，开发者按规范拼接的scene_param参数'),
                    welcomeCode: string().desc(
                        `如果满足发送欢迎语条件（条件为：用户在过去48小时里未收过欢迎语，且未向客服发过消息），会返回该字段。
                        可用该welcome_code调用发送事件响应消息接口给客户发送欢迎语。`
                    ),
                    wechatChannels: object({
                        nickname: string().desc('视频号名称，视频号场景值为1、2、3时返回此项'),
                        scene: integer().desc('视频号场景值。1：视频号主页，2：视频号直播间商品列表页，3：视频号商品橱窗页，4：视频号小店商品详情页，5：视频号小店订单页'),
                        shopNickname: string().desc('视频号小店名称，视频号场景值为4、5时返回此项'),
                    })
                        .desc('进入会话的视频号信息，从视频号进入会话才有值')
                })
                    .desc('用户进入会话事件'),
                object({
                    eventType: 'msg_send_fail',
                    openKfid: string().desc('客服帐号ID'),
                    externalUserid: string().desc('客户UserID'),
                    failMsgid: string().desc('发送失败的消息msgid'),
                    failType: integer().desc('失败类型。0-未知原因 1-客服帐号已删除 2-应用已关闭 4-会话已过期，超过48小时 5-会话已关闭 6-超过5条限制 7-未绑定视频号 8-主体未验证 9-未绑定视频号且主体未验证 10-用户拒收')
                })
                    .desc('消息发送失败事件'),
                object({
                    eventType: 'servicer_status_change',
                    servicerUserid: string().desc('接待人员userid'),
                    openKfid: string().desc('客服帐号ID'),
                    status: integer().desc('状态类型。1-接待中 2-停止接待')
                })
                    .desc('接待人员接待状态变更事件'),
                object({
                    eventType: 'session_status_change',
                    openKfid: string().desc('客服帐号ID'),
                    externalUserid: string().desc('客户UserID'),
                    servicerUserid: string().desc('接待人员userid'),
                    changeType: integer().desc('变更类型，均为接待人员在企业微信客户端操作触发。1-从接待池接入会话 2-转接会话 3-结束会话 4-重新接入已结束/已转接会话'),
                    oldServicerUserid: string().desc('老的接待人员userid。仅change_type为2、3和4有值'),
                    newServicerUserid: string().desc('新的接待人员userid。仅change_type为1、2和4有值'),
                    msgCode: string().desc('用于发送事件响应消息的code，仅change_type为1和3时，会返回该字段。 可用该msg_code调用发送事件响应消息接口给客户发送回复语或结束语。'),
                })
                    .desc('会话状态变更事件'),
                object({
                    eventType: 'user_recall_msg',
                    openKfid: string().desc('客服帐号ID'),
                    externalUserid: string().desc('客户UserID'),
                    recallMsgid: string().desc('撤回的消息msgid')
                })
                    .desc('接待人员撤回消息事件'),
                object({
                    eventType: 'reject_customer_msg_switch_change',
                    openKfid: string().desc('客服帐号ID'),
                    externalUserid: string().desc('客户UserID'),
                    servicerUserid: string().desc('接待人员userid'),
                    rejectSwitch: integer().desc('拒收客户消息，1表示接待人员拒收了客户消息，0表示接待人员取消拒收客户消息')
                })
                    .desc('拒收客户消息变更事件'),
            )
        })
            .additionalProperties(false)
    )
})
    .additionalProperties(false)
    .requireAll()

module.exports = { info, request, response };