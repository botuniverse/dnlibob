import * as ActionDetail from './detail.ts'
import { Self } from '../share.ts'

export { ActionDetail }

export interface ActionMap {
    get_latest_events: ActionDetail.GetLatestEvents
    get_supported_actions: ActionDetail.GetSupportedActions
    get_status: ActionDetail.GetStatus
    get_version: ActionDetail.GetVersion
    send_message: ActionDetail.SendMessage
    delete_message: ActionDetail.DeleteMessage
    get_self_info: ActionDetail.GetSelfInfo
    get_user_info: ActionDetail.GetUserInfo
    get_friend_list: ActionDetail.GetFriendList
    get_group_info: ActionDetail.GetGroupInfo
    get_group_list: ActionDetail.GetGroupList
    get_group_member_info: ActionDetail.GetGroupMemberInfo
    get_group_member_list: ActionDetail.GetGroupMemberList
    set_group_name: ActionDetail.SetGroupName
    leave_group: ActionDetail.LeaveGroup
    get_guild_info: ActionDetail.GetGuildInfo
    get_guild_list: ActionDetail.GetGuildList
    set_guild_name: ActionDetail.SetGuildName
    get_guild_member_info: ActionDetail.GetGuildMemberInfo
    get_guild_member_list: ActionDetail.GetGuildMemberList
    leave_guild: ActionDetail.LeaveGuild
    get_channel_info: ActionDetail.GetChannelInfo
    get_channel_list: ActionDetail.GetChannelList
    set_channel_name: ActionDetail.SetChannelName
    get_channel_member_info: ActionDetail.GetChannelMemberInfo
    get_channel_member_list: ActionDetail.GetChannelMemberList
    leave_channel: ActionDetail.LeaveChannel
    upload_file: ActionDetail.UploadFile
    upload_file_fragmented: ActionDetail.UploadFileFragmentedFinish | ActionDetail.UploadFileFragmentedPrepare | ActionDetail.UploadFileFragmentedTransfer
    get_file: ActionDetail.GetFile
    get_file_fragmented: ActionDetail.GetFileFragmentedPrepare | ActionDetail.GetFileFragmentedTransfer
}

export type Action<K extends keyof ActionMap = keyof ActionMap> = ActionMap[K]

export interface ActionBase {
    /** 动作名称，如 `send_message` */
    action: string
    /** 动作参数 */
    params: Record<string, unknown>
    /** 可以用于唯一标识一个动作请求 */
    echo?: string
    /** 机器人自身标识 */
    self?: Self
}