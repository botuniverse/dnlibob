import { Resp } from '../resp/mod.ts'
import { Message } from '../message/mod.ts'
import { Self } from '../share.ts'
import { EventBase } from './mod.ts'

interface MetaEvent extends EventBase {
    type: 'meta'
}

interface MessageEvent extends EventBase {
    type: 'message'
    /** 消息内容 */
    message: Message
    /** 消息唯一 ID */
    message_id: string
    /** 消息内容的替代表示, 可以为空 */
    alt_message: string
    /** 用户 ID */
    user_id: string
    self: Self
}

interface NoticeEvent extends EventBase {
    type: 'notice'
    self: Self
}

/** 连接
 * - 对于正向 WebSocket 和反向 WebSocket 通信方式，OneBot 实现应在连接建立后立即产生一个连接事件，以向应用端推送当前实现端的相关版本信息。连接事件必须是一次成功的正向或反向 WebSocket 连接上传输的第一个事件。
 * - HTTP 和 HTTP Webhook 通信方式不需要产生连接事件。
 */
export interface Connect extends MetaEvent {
    detail_type: 'connect'
    /** OneBot 实现端版本信息，与 `get_version` 动作响应数据一致 */
    version: Resp<'get_version'>['data']
}

/** 心跳 */
export interface Heartbeat extends MetaEvent {
    detail_type: 'heartbeat'
    /** 到下次心跳的间隔，单位：毫秒 */
    interval: number
}

/** 状态更新
 * - 对于正向 WebSocket 和反向 WebSocket 通信方式，OneBot 实现应在连接建立后的适当时机（如所有机器人账号登录完成后）产生一个状态更新事件，发送所有机器人账号的状态。
 * - 对于 HTTP Webhook 通信方式，OneBot 实现应在启动后的适当时机（如所有机器人账号登录完成后）产生一个状态更新事件，发送所有机器人账号的状态。
 * - 在上述时机首次产生事件后，实现应在机器人账号或实现本身状态有变化时产生状态更新事件。
 */
export interface StatusUpdate extends MetaEvent {
    detail_type: 'status_update'
    /** OneBot 实现端状态信息，与 `get_status` 动作响应数据一致 */
    status: Resp<'get_status'>['data']
}

/** 私聊消息 */
export interface Private extends MessageEvent {
    detail_type: 'private'
}

/** 群消息 */
export interface Group extends MessageEvent {
    detail_type: 'group'
    /** 群 ID */
    group_id: string
}

/** 频道消息 */
export interface Channel extends MessageEvent {
    detail_type: 'channel'
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
}

/** 好友增加
 * - 本事件应在好友或关注者增加时触发。
 */
export interface FriendIncrease extends NoticeEvent {
    detail_type: 'friend_increase'
    /** 用户 ID */
    user_id: string
}

/** 好友减少
 * - 本事件应在好友或关注者减少时触发。
 */
export interface FriendDecrease extends NoticeEvent {
    detail_type: 'friend_decrease'
    /** 用户 ID */
    user_id: string
}

/** 私聊消息删除
 * - 本事件应在私聊消息被删除时触发。
 */
export interface PrivateMessageDelete extends NoticeEvent {
    detail_type: 'private_message_delete'
    /** 消息 ID */
    message_id: string
    /** 消息发送者 ID */
    user_id: string
}

/** 群成员增加
 * - 本事件应在群成员（包括机器人自身）申请加群通过、被邀请进群或其它方式进群时触发。
 */
export interface GroupMemberIncrease extends NoticeEvent {
    detail_type: 'group_member_increase'
    /** 必须为 `join`、`invite`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群 ID */
    group_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 群成员减少
 * - 本事件应在群成员（包括机器人自身）主动退出、被踢出或其它方式退出时触发。
 */
export interface GroupMemberDecrease extends NoticeEvent {
    detail_type: 'group_member_decrease'
    /** 必须为 `leave`、`kick`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群 ID */
    group_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 群消息删除
 * - 本事件应在群消息被撤回或被管理员删除时触发。
 */
export interface GroupMessageDelete extends NoticeEvent {
    detail_type: 'group_message_delete'
    /** 必须为 `recall`、`delete`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群 ID */
    group_id: string
    /** 消息 ID */
    message_id: string
    /** 消息发送者 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 群组成员增加 */
export interface GuildMemberIncrease extends NoticeEvent {
    detail_type: 'guild_member_increase'
    /** 必须为 `join`、`invite`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群组 ID */
    guild_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 群组成员减少 */
export interface GuildMemberDecrease extends NoticeEvent {
    detail_type: 'guild_member_decrease'
    /** 必须为 `leave`、`kick`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群组 ID */
    guild_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 频道成员增加 */
export interface ChannelMemberIncrease extends NoticeEvent {
    detail_type: 'channel_member_increase'
    /** 必须为 `join`、`invite`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 频道成员减少 */
export interface ChannelMemberDecrease extends NoticeEvent {
    detail_type: 'channel_member_decrease'
    /** 必须为 `leave`、`kick`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
    /** 用户 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 频道消息删除 */
export interface ChannelMessageDelete extends NoticeEvent {
    detail_type: 'channel_message_delete'
    /** 必须为 `recall`、`delete`、空字符串或扩展的子类型 */
    sub_type: string
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
    /** 消息 ID */
    message_id: string
    /** 消息发送者 ID */
    user_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 频道新建 */
export interface ChannelCreate extends NoticeEvent {
    detail_type: 'channel_create'
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
    /** 操作者 ID */
    operator_id: string
}

/** 频道删除 */
export interface ChannelDelete extends NoticeEvent {
    detail_type: 'channel_delete'
    /** 群组 ID */
    guild_id: string
    /** 频道 ID */
    channel_id: string
    /** 操作者 ID */
    operator_id: string
}