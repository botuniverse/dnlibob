import * as TE from './types.ts'

export type MetaEvents = TE.Heartbeat | TE.StatusUpdate

export type UserMessageEvents = TE.Private

export type GroupMessageEvents = TE.Group

export type GuildMessageEvents = TE.Channel

export type UserNoticeEvents = TE.FriendIncrease | TE.FriendDecrease | TE.PrivateMessageDelete

export type GroupNoticeEvents = TE.GroupMemberIncrease | TE.GroupMemberDecrease | TE.GroupMessageDelete

export type GuildNoticeEvents = TE.GuildMemberIncrease | TE.GuildMemberDecrease | TE.ChannelMemberIncrease | TE.ChannelMemberDecrease | TE.ChannelMessageDelete | TE.ChannelCreate | TE.ChannelDelete

export type AllEvents = MetaEvents | UserMessageEvents | GroupMessageEvents | GuildMessageEvents | UserNoticeEvents | GroupNoticeEvents | GuildNoticeEvents