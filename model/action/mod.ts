import * as ActionsDetail from './detail.ts'

export type MetaActions = ActionsDetail.GetLatestEvents | ActionsDetail.GetStatus | ActionsDetail.GetSupportedActions | ActionsDetail.GetVersion

export type MessageActions = ActionsDetail.SendMessage | ActionsDetail.DeleteMessage

export type UserActions = ActionsDetail.GetSelfInfo | ActionsDetail.GetUserInfo | ActionsDetail.GetFriendList

export type GroupActions = ActionsDetail.GetGroupInfo | ActionsDetail.GetGroupList | ActionsDetail.GetGroupMemberInfo | ActionsDetail.SetGroupName | ActionsDetail.LeaveGroup

export type GuildActions = ActionsDetail.GetGuildInfo | ActionsDetail.GetGuildList | ActionsDetail.GetGuildInfo | ActionsDetail.GetGuildMemberInfo | ActionsDetail.GetGuildMemberList | ActionsDetail.LeaveGuild | ActionsDetail.GetChannelInfo | ActionsDetail.GetChannelList | ActionsDetail.SetChannelName | ActionsDetail.GetChannelMemberInfo | ActionsDetail.GetChannelMemberList | ActionsDetail.LeaveChannel

export type FileActions = ActionsDetail.UploadFile | ActionsDetail.UploadFileFragmentedPrepare | ActionsDetail.UploadFileFragmentedTransfer | ActionsDetail.UploadFileFragmentedFinish | ActionsDetail.GetFile | ActionsDetail.GetFileFragmentedPrepare | ActionsDetail.GetFileFragmentedTransfer

export type AllActions = MetaActions | MessageActions | UserActions | GroupActions | GuildActions

export { ActionsDetail }