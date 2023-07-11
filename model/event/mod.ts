import * as EventsDetail from './detail.ts'
import { Self } from '../share.ts'

export { EventsDetail }

export interface EventsMap {
    'meta.connect': EventsDetail.Connect
    'meta.heartbeat': EventsDetail.Heartbeat
    'meta.status_update': EventsDetail.StatusUpdate
    'message.private': EventsDetail.Private
    'message.group': EventsDetail.Group
    'message.channel': EventsDetail.Channel
    'notice.friend_increase': EventsDetail.FriendIncrease
    'notice.friend_decrease': EventsDetail.FriendDecrease
    'notice.private_message_delete': EventsDetail.PrivateMessageDelete
    'notice.group_member_increase': EventsDetail.GroupMemberIncrease
    'notice.group_member_decrease': EventsDetail.GroupMemberDecrease
    'notice.group_message_delete': EventsDetail.GroupMessageDelete
    'notice.guild_member_increase': EventsDetail.GuildMemberIncrease
    'notice.guild_member_decrease': EventsDetail.GuildMemberDecrease
    'notice.channel_member_increase': EventsDetail.ChannelMemberIncrease
    'notice.channel_member_decrease': EventsDetail.ChannelMemberDecrease
    'notice.channel_message_delete': EventsDetail.ChannelMessageDelete
    'notice.channel_create': EventsDetail.ChannelCreate
    'notice.channel_delete': EventsDetail.ChannelDelete
}

export type Events<K extends keyof EventsMap = keyof EventsMap> = EventsMap[K]

export interface EventBase {
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