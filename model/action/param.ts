// deno-lint-ignore-file no-empty-interface
import { Message } from '../message/mod.ts'

export interface GetLatestEvents {
    /** 获取的事件数量上限，0 表示不限制 */
    limit?: number
    /** 没有事件时最多等待的秒数，0 表示使用短轮询，不等待 */
    timeout?: number
}

export interface GetSupportedActions {
}

export interface GetStatus {
}

export interface GetVersion {
}

export interface SendMessage {
    /** 发送的类型，可以为 `private`、`group`、`channel` 或扩展的类型，和**消息事件**的 `detail_type` 字段对应 */
    detail_type: string
    /** 用户 ID，当 `detail_type` 为 `private` 时必须传入 */
    user_id?: string
    /** 群 ID，当 `detail_type` 为 `group` 时必须传入 */
    group_id?: string
    /** Guild 群组 ID，当 `detail_type` 为 `channel` 时必须传入 */
    guild_id?: string
    /** 频道 ID，当 `detail_type` 为 `channel` 时必须传入 */
    channel_id?: string
    /** 消息内容 */
    message: Message
}

export interface DeleteMessage {
    /** 唯一的消息 ID */
    message_id: string
}

export interface GetSelfInfo {
}

export interface GetUserInfo {
    /** 用户 ID，可以是好友，也可以是陌生人 */
    user_id: string
}

export interface GetFriendList {
}

export interface GetGroupInfo {
    /** 群 ID */
    group_id: string
}

export interface GetGroupList {
}

export interface GetGroupMemberInfo {
    /** 群 ID */
    group_id: string
    /** 用户 ID */
    user_id: string
}

export interface GetGroupMemberList {
    /** 群 ID */
    group_id: string
}

export interface SetGroupName {
    /** 群 ID */
    group_id: string
    /** 新群名称 */
    group_name: string
}

export interface LeaveGroup {
    /** 群 ID */
    group_id: string
}

export interface GetGuildInfo {
    /** 群组 ID */
    guild_id: string
}

export interface GetGuildList {
}

export interface SetGuildName {
    /** 群组 ID */
    guild_id: string
    /** 新群组名称 */
    guild_name: string
}

export interface GetGuildMemberInfo {
    /** 群组 ID */
    guild_id: string
    /** 用户 ID */
    user_id: string
}

export interface GetGuildMemberList {
    /** 群组 ID */
    guild_id: string
}

export interface LeaveGuild {
    /** 群组 ID */
    guild_id: string
}

export interface GetChannelInfo {
    /** 频道 ID */
    channel_id: string
    /** 群组 ID */
    guild_id: string
}

export interface GetChannelList {
    /** 群组 ID */
    guild_id: string
    /** 只获取机器人账号已加入的频道列表 */
    joined_only?: boolean
}

export interface SetChannelName {
    /** 频道 ID */
    channel_id: string
    /** 群组 ID */
    guild_id: string
    /** 新频道名称 */
    channel_name: string
}

export interface GetChannelMemberInfo {
    /** 频道 ID */
    channel_id: string
    /** 群组 ID */
    guild_id: string
    /** 用户 ID */
    user_id: string
}

export interface GetChannelMemberList {
    /** 频道 ID */
    channel_id: string
    /** 群组 ID */
    guild_id: string
}

export interface LeaveChannel {
    /** 频道 ID */
    channel_id: string
    /** 群组 ID */
    guild_id: string
}

export interface UploadFile {
    /** 上传文件的方式，可以为 `url`、`path`、`data` 或扩展的方式 */
    type: 'url' | 'path' | 'data'
    /** 文件名，如 `foo.jpg` */
    name: string
    /** 文件 URL，当 `type` 为 `url` 时必须传入，OneBot 实现必须支持以 HTTP(S) 协议从此 URL 下载要上传的文件 */
    url?: string
    /** 下载 URL 时需要添加的 HTTP 请求头，可选传入，当 `type` 为 `url` 时 OneBot 实现必须在请求 URL 时加上这些请求头 */
    headers?: Record<string, string>
    /** 文件路径，当 `type` 为 `path` 时必须传入，OneBot 实现必须能从此路径访问要上传的文件 */
    path?: string
    /** 文件数据，当 `type` 为 `data` 时必须传入 */
    data?: ArrayBuffer | string
    /** 文件数据（原始二进制）的 SHA256 校验和，全小写，可选传入 */
    sha256?: string
}

export interface UploadFileFragmentedPrepare {
    /** 上传阶段，必须为 `prepare` */
    stage: 'prepare'
    /** 文件名，如 `foo.jpg` */
    name: string
    /** 文件完整大小，单位：字节 */
    total_size: number
}

export interface UploadFileFragmentedTransfer {
    /** 上传阶段，必须为 `transfer` */
    stage: 'transfer'
    /** 准备阶段返回的文件 ID */
    file_id: string
    /** 本次传输的文件偏移，单位：字节 */
    offset: number
    /** 本次传输的文件数据 */
    data: ArrayBuffer | string
}

export interface UploadFileFragmentedFinish {
    /** 上传阶段，必须为 `finish` */
    stage: 'finish'
    /** 准备阶段返回的文件 ID */
    file_id: string
    /** 整个文件的 SHA256 校验和，全小写 */
    sha256: string
}

export interface GetFile {
    /** 文件 ID */
    file_id: string
    /** 获取文件的方式，可以为 `url`、`path`、`data` 或扩展的方式 */
    type: string
}

export interface GetFileFragmentedPrepare {
    /** 上传阶段，必须为 `prepare` */
    stage: 'prepare'
    /** 文件 ID */
    file_id: string
}

export interface GetFileFragmentedTransfer {
    /** 上传阶段，必须为 `transfer` */
    stage: 'transfer'
    /** 文件 ID */
    file_id: string
    /** 本次传输的文件偏移，单位：字节 */
    offset: number
    /** 本次传输的文件大小，单位：字节 */
    size: number
}
