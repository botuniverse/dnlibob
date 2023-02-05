import * as EventDetail from './detail.ts'
import { Self, ExtendedMap } from '../share.ts'

export { EventDetail }

export interface EventMap {
    'meta.connect': EventDetail.Connect
    'meta.heartbeat': EventDetail.Heartbeat
    'meta.status_update': EventDetail.StatusUpdate
    'message.private': EventDetail.Private
    'message.group': EventDetail.Group
    'message.channel': EventDetail.Channel
    'notice.friend_increase': EventDetail.FriendIncrease
    'notice.friend_decrease': EventDetail.FriendDecrease
    'notice.private_message_delete': EventDetail.PrivateMessageDelete
    'notice.group_member_increase': EventDetail.GroupMemberIncrease
    'notice.group_member_decrease': EventDetail.GroupMemberDecrease
    'notice.group_message_delete': EventDetail.GroupMessageDelete
    'notice.guild_member_increase': EventDetail.GuildMemberIncrease
    'notice.guild_member_decrease': EventDetail.GuildMemberDecrease
    'notice.channel_member_increase': EventDetail.ChannelMemberIncrease
    'notice.channel_member_decrease': EventDetail.ChannelMemberDecrease
    'notice.channel_message_delete': EventDetail.ChannelMessageDelete
    'notice.channel_create': EventDetail.ChannelCreate
    'notice.channel_delete': EventDetail.ChannelDelete
}

export type Event<K extends keyof EventMap = keyof EventMap> = EventMap[K]

export interface EventBase extends ExtendedMap {
    /** 事件唯一标识符 */
    id: string
    /** 事件发生时间（Unix 时间戳），单位：秒，建议优先采用聊天平台给出的时间，其次采用实现中创建事件对象的时间 */
    time: number
    /** 事件类型，必须是 `meta`、`message`、`notice`、`request` 中的一个，分别表示元事件、消息事件、通知事件和请求事件 */
    type: 'meta' | 'message' | 'notice' | 'request'
    /** 事件详细类型 */
    detail_type: string
    /** 事件子类型（详细类型的下一级类型） */
    sub_type: string
    /** 机器人自身标识 */
    self?: Self
}