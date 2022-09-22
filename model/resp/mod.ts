import * as RespsDetail from './detail.ts'

export type MetaResps = RespsDetail.GetLatestEvents | RespsDetail.GetStatus | RespsDetail.GetSupportedActions | RespsDetail.GetVersion

export type MessageResps = RespsDetail.SendMessage | RespsDetail.DeleteMessage

export type UserResps = RespsDetail.GetSelfInfo | RespsDetail.GetUserInfo | RespsDetail.GetFriendList

export type GroupResps = RespsDetail.GetGroupInfo | RespsDetail.GetGroupList | RespsDetail.GetGroupMemberInfo | RespsDetail.SetGroupName | RespsDetail.LeaveGroup

export type GuildResps = RespsDetail.GetGuildInfo | RespsDetail.GetGuildList | RespsDetail.GetGuildInfo | RespsDetail.GetGuildMemberInfo | RespsDetail.GetGuildMemberList | RespsDetail.LeaveGuild | RespsDetail.GetChannelInfo | RespsDetail.GetChannelList | RespsDetail.SetChannelName | RespsDetail.GetChannelMemberInfo | RespsDetail.GetChannelMemberList | RespsDetail.LeaveChannel

export type FileResps = RespsDetail.UploadFile | RespsDetail.UploadFileFragmentedPrepare | RespsDetail.UploadFileFragmentedTransfer | RespsDetail.UploadFileFragmentedFinish | RespsDetail.GetFile | RespsDetail.GetFileFragmentedPrepare | RespsDetail.GetFileFragmentedTransfer

export type AllResps = MetaResps | MessageResps | UserResps | GroupResps | GuildResps

export { RespsDetail }