import * as TR from './types.ts'

export type MetaResps = TR.GetLatestEvents | TR.GetStatus | TR.GetSupportedActions | TR.GetVersion

export type MessageResps = TR.SendMessage | TR.DeleteMessage

export type UserResps = TR.GetSelfInfo | TR.GetUserInfo | TR.GetFriendList

export type GroupResps = TR.GetGroupInfo | TR.GetGroupList | TR.GetGroupMemberInfo | TR.SetGroupName | TR.LeaveGroup

export type GuildResps = TR.GetGuildInfo | TR.GetGuildList | TR.GetGuildInfo | TR.GetGuildMemberInfo | TR.GetGuildMemberList | TR.LeaveGuild | TR.GetChannelInfo | TR.GetChannelList | TR.SetChannelName | TR.GetChannelMemberInfo | TR.GetChannelMemberList | TR.LeaveChannel

export type FileResps = TR.UploadFile | TR.UploadFileFragmentedPrepare | TR.UploadFileFragmentedTransfer | TR.UploadFileFragmentedFinish | TR.GetFile | TR.GetFileFragmentedPrepare | TR.GetFileFragmentedTransfer

export type AllResps = MetaResps | MessageResps | UserResps | GroupResps | GuildResps