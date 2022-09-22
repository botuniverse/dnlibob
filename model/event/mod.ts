import * as EventsDetail from './detail.ts'

export type MetaEvents = EventsDetail.Heartbeat | EventsDetail.StatusUpdate

export type UserMessageEvents = EventsDetail.Private

export type GroupMessageEvents = EventsDetail.Group

export type GuildMessageEvents = EventsDetail.Channel

export type UserNoticeEvents = EventsDetail.FriendIncrease | EventsDetail.FriendDecrease | EventsDetail.PrivateMessageDelete

export type GroupNoticeEvents = EventsDetail.GroupMemberIncrease | EventsDetail.GroupMemberDecrease | EventsDetail.GroupMessageDelete

export type GuildNoticeEvents = EventsDetail.GuildMemberIncrease | EventsDetail.GuildMemberDecrease | EventsDetail.ChannelMemberIncrease | EventsDetail.ChannelMemberDecrease | EventsDetail.ChannelMessageDelete | EventsDetail.ChannelCreate | EventsDetail.ChannelDelete

export type AllEvents = MetaEvents | UserMessageEvents | GroupMessageEvents | GuildMessageEvents | UserNoticeEvents | GroupNoticeEvents | GuildNoticeEvents

export { EventsDetail }