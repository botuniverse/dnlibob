import * as Action from './types.ts'

/** OneBot 12 动作请求
 * - **动作请求**是应用端为了主动向 OneBot 实现请求服务而发送的数据
 */
export type TotalAction = Action.GetLatestEvents | Action.GetSupportedActions | Action.GetStatus | Action.GetVersion | Action.SendMessage | Action.DeleteMessage | Action.GetSelfInfo | Action.GetUserInfo | Action.GetFriendList | Action.GetGroupInfo | Action.GetGroupList | Action.GetGroupMemberInfo | Action.GetGroupMemberList | Action.SetGroupName | Action.LeaveGroup | Action.GetGuildInfo | Action.GetGuildList | Action.SetGuildName | Action.GetGuildMemberInfo | Action.GetGuildMemberList | Action.LeaveGuild | Action.GetChannelInfo | Action.GetChannelList | Action.SetChannelName | Action.GetChannelMemberInfo | Action.GetChannelMemberList | Action.LeaveChannel

export { Action }