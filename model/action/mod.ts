// deno-lint-ignore-file no-explicit-any
import * as ActionsDetail from './detail.ts'
import { Self } from '../share.ts'

export { ActionsDetail }

export interface ActionsMap {
    get_latest_events: ActionsDetail.GetLatestEvents
    get_supported_actions: ActionsDetail.GetSupportedActions
    get_status: ActionsDetail.GetStatus
    get_version: ActionsDetail.GetVersion
    send_message: ActionsDetail.SendMessage
    delete_message: ActionsDetail.DeleteMessage
    get_self_info: ActionsDetail.GetSelfInfo
    get_user_info: ActionsDetail.GetUserInfo
    get_friend_list: ActionsDetail.GetFriendList
    get_group_info: ActionsDetail.GetGroupInfo
    get_group_list: ActionsDetail.GetGroupList
    get_group_member_info: ActionsDetail.GetGroupMemberInfo
    get_group_member_list: ActionsDetail.GetGroupMemberList
    set_group_name: ActionsDetail.SetGroupName
    leave_group: ActionsDetail.LeaveGroup
    get_guild_info: ActionsDetail.GetGuildInfo
    get_guild_list: ActionsDetail.GetGuildList
    set_guild_name: ActionsDetail.SetGuildName
    get_guild_member_info: ActionsDetail.GetGuildMemberInfo
    get_guild_member_list: ActionsDetail.GetGuildMemberList
    leave_guild: ActionsDetail.LeaveGuild
    get_channel_info: ActionsDetail.GetChannelInfo
    get_channel_list: ActionsDetail.GetChannelList
    set_channel_name: ActionsDetail.SetChannelName
    get_channel_member_info: ActionsDetail.GetChannelMemberInfo
    get_channel_member_list: ActionsDetail.GetChannelMemberList
    leave_channel: ActionsDetail.LeaveChannel
    upload_file: ActionsDetail.UploadFile
    upload_file_fragmented: ActionsDetail.UploadFileFragmentedFinish | ActionsDetail.UploadFileFragmentedPrepare | ActionsDetail.UploadFileFragmentedTransfer
    get_file: ActionsDetail.GetFile
    get_file_fragmented: ActionsDetail.GetFileFragmentedPrepare | ActionsDetail.GetFileFragmentedTransfer
}

export type Actions<K extends keyof ActionsMap = keyof ActionsMap> = ActionsMap[K]

export interface ActionBase {
    /** 动作名称，如 `send_message` */
    action: string
    /** 动作参数 */
    params: Record<string, any>
    /** 可以用于唯一标识一个动作请求 */
    echo?: string
    /** 机器人自身标识 */
    self?: Self
}