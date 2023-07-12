// deno-lint-ignore-file no-explicit-any
import * as RespsDetail from './detail.ts'

export { RespsDetail }

export interface RespsMap {
    get_latest_events: RespsDetail.GetLatestEvents
    get_supported_actions: RespsDetail.GetSupportedActions
    get_status: RespsDetail.GetStatus
    get_version: RespsDetail.GetVersion
    send_message: RespsDetail.SendMessage
    delete_message: RespsDetail.DeleteMessage
    get_self_info: RespsDetail.GetSelfInfo
    get_user_info: RespsDetail.GetUserInfo
    get_friend_list: RespsDetail.GetFriendList
    get_group_info: RespsDetail.GetGroupInfo
    get_group_list: RespsDetail.GetGroupList
    get_group_member_info: RespsDetail.GetGroupMemberInfo
    get_group_member_list: RespsDetail.GetGroupMemberList
    set_group_name: RespsDetail.SetGroupName
    leave_group: RespsDetail.LeaveGroup
    get_guild_info: RespsDetail.GetGuildInfo
    get_guild_list: RespsDetail.GetGuildList
    set_guild_name: RespsDetail.SetGuildName
    get_guild_member_info: RespsDetail.GetGuildMemberInfo
    get_guild_member_list: RespsDetail.GetGuildMemberList
    leave_guild: RespsDetail.LeaveGuild
    get_channel_info: RespsDetail.GetChannelInfo
    get_channel_list: RespsDetail.GetChannelList
    set_channel_name: RespsDetail.SetChannelName
    get_channel_member_info: RespsDetail.GetChannelMemberInfo
    get_channel_member_list: RespsDetail.GetChannelMemberList
    leave_channel: RespsDetail.LeaveChannel
    upload_file: RespsDetail.UploadFile
    upload_file_fragmented: RespsDetail.UploadFileFragmentedFinish | RespsDetail.UploadFileFragmentedPrepare | RespsDetail.UploadFileFragmentedTransfer
    get_file: RespsDetail.GetFile
    get_file_fragmented: RespsDetail.GetFileFragmentedPrepare | RespsDetail.GetFileFragmentedTransfer
    failed: RespsDetail.Failed
}

export type Resps<K extends keyof RespsMap = keyof RespsMap> = RespsMap[K]

export interface RespBase {
    /** 执行状态（成功与否），必须是 `ok`、`failed` 中的一个，分别表示执行成功和失败 */
    status: 'ok' | 'failed'
    /** 返回码，必须符合 OneBot 12 文档所定义的返回码规则 */
    retcode: number
    /** 响应数据 */
    data: any
    /** 错误信息，当动作执行失败时，建议在此填写人类可读的错误信息，当执行成功时，应为空字符串 */
    message: string
    /** 应原样返回动作请求中的 `echo` 字段值 */
    echo?: string
}