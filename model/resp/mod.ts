import * as RespDetail from './detail.ts'

export { RespDetail }

export interface RespMap {
    get_latest_events: RespDetail.GetLatestEvents
    get_supported_actions: RespDetail.GetSupportedActions
    get_status: RespDetail.GetStatus
    get_version: RespDetail.GetVersion
    send_message: RespDetail.SendMessage
    delete_message: RespDetail.DeleteMessage
    get_self_info: RespDetail.GetSelfInfo
    get_user_info: RespDetail.GetUserInfo
    get_friend_list: RespDetail.GetFriendList
    get_group_info: RespDetail.GetGroupInfo
    get_group_list: RespDetail.GetGroupList
    get_group_member_info: RespDetail.GetGroupMemberInfo
    get_group_member_list: RespDetail.GetGroupMemberList
    set_group_name: RespDetail.SetGroupName
    leave_group: RespDetail.LeaveGroup
    get_guild_info: RespDetail.GetGuildInfo
    get_guild_list: RespDetail.GetGuildList
    set_guild_name: RespDetail.SetGuildName
    get_guild_member_info: RespDetail.GetGuildMemberInfo
    get_guild_member_list: RespDetail.GetGuildMemberList
    leave_guild: RespDetail.LeaveGuild
    get_channel_info: RespDetail.GetChannelInfo
    get_channel_list: RespDetail.GetChannelList
    set_channel_name: RespDetail.SetChannelName
    get_channel_member_info: RespDetail.GetChannelMemberInfo
    get_channel_member_list: RespDetail.GetChannelMemberList
    leave_channel: RespDetail.LeaveChannel
    upload_file: RespDetail.UploadFile
    upload_file_fragmented: RespDetail.UploadFileFragmentedFinish | RespDetail.UploadFileFragmentedPrepare | RespDetail.UploadFileFragmentedTransfer
    get_file: RespDetail.GetFile
    get_file_fragmented: RespDetail.GetFileFragmentedPrepare | RespDetail.GetFileFragmentedTransfer
}

export type Resp<K extends keyof RespMap = keyof RespMap> = RespMap[K]

export interface RespBase {
    /** 执行状态（成功与否），必须是 `ok`、`failed` 中的一个，分别表示执行成功和失败 */
    status: 'ok' | 'failed'
    /** 返回码，必须符合 OneBot 12 文档所定义的返回码规则 */
    retcode: number
    /** 响应数据 */
    data: unknown
    /** 错误信息，当动作执行失败时，建议在此填写人类可读的错误信息，当执行成功时，应为空字符串 */
    message: string
    /** 应原样返回动作请求中的 `echo` 字段值 */
    echo?: string
}