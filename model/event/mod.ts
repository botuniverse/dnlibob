import * as EventDetail from './detail.ts'
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