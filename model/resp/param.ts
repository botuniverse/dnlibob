// deno-lint-ignore-file no-empty-interface
import { Self } from '../share.ts'

export interface GetStatus {
    /** 是否各项状态都符合预期，OneBot 实现各模块均正常 */
    good: boolean
    /** 当前 OneBot Connect 连接上所有机器人账号的状态列表 */
    bots: {
        /** 机器人自身标识 */
        online: boolean
        /** 机器人账号是否在线（可收发消息等） */
        self: Self
    }[]
}

export interface GetVersion {
    /** OneBot 实现名称 */
    impl: string
    /** OneBot 实现的版本号 */
    version: string
    /** OneBot 实现的 OneBot 标准版本号 */
    onebot_version: string
}

export interface SendMessage {
    /** 消息 ID */
    message_id: string
    /** 消息成功发出的时间（Unix 时间戳），单位：秒 */
    time: number
}

export interface DeleteMessage {
}

export interface GetSelfInfo {
    /** 用户 ID */
    user_id: string
    /** 用户名称/姓名/昵称 */
    user_name: string
    /** 用户设置的显示名称，若无则为空字符串 */
    user_displayname: string
}

export interface GetUserInfo {
    /** 用户 ID */
    user_id: string
    /** 用户名称/姓名/昵称 */
    user_name: string
    /** 用户设置的显示名称，若无则为空字符串 */
    user_displayname: string
    /** 机器人账号对该用户的备注名称，若无则为空字符串 */
    user_remark: string
}

export interface GetGroupInfo {
    /** 群 ID */
    group_id: string
    /** 群名称 */
    group_name: string
}

export interface GetGroupMemberInfo {
    /** 用户 ID */
    user_id: string
    /** 用户名称/姓名/昵称 */
    user_name: string
    /** 用户设置的群内显示名称或账号显示名称，若无则为空字符串 */
    user_displayname: string
}

export interface SetGroupName {
}

export interface LeaveGroup {
}

export interface GetGuildInfo {
    /** 群组 ID */
    guild_id: string
    /** 群组名称 */
    guild_name: string
}

export interface SetGuildName {
}

export interface GetGuildMemberInfo {
    /** 用户 ID */
    user_id: string
    /** 用户名称/姓名/昵称 */
    user_name: string
    /** 用户设置的群内显示名称或账号显示名称，若无则为空字符串 */
    user_displayname: string
}

export interface LeaveGuild {
}

export interface GetChannelInfo {
    data: {
        /** 频道 ID */
        channel_id: string
        /** 频道名称 */
        channel_name: string
    }
}

export interface SetChannelName {
}

export interface GetChannelMemberInfo {
    /** 用户 ID */
    user_id: string
    /** 用户名称/姓名/昵称 */
    user_name: string
    /** 用户设置的频道内显示名称或账号显示名称，若无则为空字符串 */
    user_displayname: string
}

export interface LeaveChannel {
}

export interface UploadFile {
    /** 文件 ID，可供以后使用 */
    file_id: string
}

export interface UploadFileFragmentedPrepare {
    /** 文件 ID，仅传输阶段使用 */
    file_id: string
}

export interface UploadFileFragmentedTransfer {
}

export interface UploadFileFragmentedFinish {
    /** 文件 ID，可供以后使用 */
    file_id: string
}

export interface GetFile {
    /** 文件名，如 `foo.jpg` */
    name: string
    /** 文件 URL，当 `type` 为 `url` 时必须返回，应用端必须能以 HTTP(S) 协议从此 URL 下载文件 */
    url?: string
    /** 下载 URL 时需要添加的 HTTP 请求头，可选返回 */
    headers?: Record<string, string>
    /** 文件路径，当 `type` 为 `path` 时必须返回，应用端必须能从此路径访问文件 */
    path?: string
    /** 文件数据，当 `type` 为 `data` 时必须返回 */
    data?: ArrayBuffer | string
    /** 文件数据（原始二进制）的 SHA256 校验和，全小写，可选返回 */
    sha256?: string
}

export interface GetFileFragmentedPrepare {
    /** 文件名，如 `foo.jpg` */
    name: string
    /** 文件完整大小，单位：字节 */
    total_size: number
    /** 整个文件的 SHA256 校验和，全小写 */
    sha256: string
}

export interface GetFileFragmentedTransfer {
    /** 本次传输的文件数据 */
    data: ArrayBuffer | string
}