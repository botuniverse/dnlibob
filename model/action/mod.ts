import * as TA from './types.ts'

export type MetaActions = TA.GetLatestEvents | TA.GetStatus | TA.GetSupportedActions | TA.GetVersion

export type MessageActions = TA.SendMessage | TA.DeleteMessage

export type UserActions = TA.GetSelfInfo | TA.GetUserInfo | TA.GetFriendList

export type GroupActions = TA.GetGroupInfo | TA.GetGroupList | TA.GetGroupMemberInfo | TA.SetGroupName | TA.LeaveGroup

export type GuildActions = TA.GetGuildInfo | TA.GetGuildList | TA.GetGuildInfo | TA.GetGuildMemberInfo | TA.GetGuildMemberList | TA.LeaveGuild | TA.GetChannelInfo | TA.GetChannelList | TA.SetChannelName | TA.GetChannelMemberInfo | TA.GetChannelMemberList | TA.LeaveChannel

export type FileActions = TA.UploadFile | TA.UploadFileFragmentedPrepare | TA.UploadFileFragmentedTransfer | TA.UploadFileFragmentedFinish | TA.GetFile | TA.GetFileFragmentedPrepare | TA.GetFileFragmentedTransfer

export type AllActions = MetaActions | MessageActions | UserActions | GroupActions | GuildActions