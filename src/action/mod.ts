import { Message } from '../message/mod.ts'
import { ExtendedMap } from '../utils/value.ts'

/** OneBot 12 动作请求
 * - **动作请求**是应用端为了主动向 OneBot 实现请求服务而发送的数据
 */
export type StandardAction = Action.GetLatestEvents | Action.GetSupportedActions | Action.GetStatus | Action.GetVersion | Action.GetSelfInfo | Action.GetUserInfo | Action.GetFriendList | Action.GetGroupInfo | Action.GetGroupList | Action.GetGroupMemberInfo | Action.GetGroupMemberList | Action.SetGroupName | Action.LeaveGroup | Action.GetGuildInfo | Action.GetGuildList | Action.GetChannelInfo | Action.GetChannelList | Action.GetGuildMemberInfo | Action.GetGuildMemberList | Action.SetGuildName | Action.SetChannelName | Action.LeaveGuild | Action.UploadFile | Action.UploadFileFragmented | Action.GetFile | Action.GetFileFragmented

export namespace Action {

    export interface _Base<A extends string, P extends ExtendedMap = {}> {
        /** 动作名称，如 `send_message` */
        action: A
        /** 动作参数 */
        params: P
    }

    /** 获取最新事件列表
     * - 仅 HTTP 通信方式必须支持，用于轮询获取事件
    */
    export type GetLatestEvents<K extends ExtendedMap = {}> = _Base<'get_latest_events', _BaseGetLatestEvents> & K

    export interface _BaseGetLatestEvents {
        /** 获取的事件数量上限，0 表示不限制 */
        limit: number
        /** 没有事件时要等待的秒数，0 表示使用短轮询，不等待 */
        timeout: number
    }

    /** 获取支持的动作列表 */
    export type GetSupportedActions<K extends ExtendedMap = {}> = _Base<'get_supported_actions'> & K

    /** 获取运行状态 */
    export type GetStatus<K extends ExtendedMap = {}> = _Base<'get_status'> & K

    /** 获取版本信息 */
    export type GetVersion<K extends ExtendedMap = {}> = _Base<'get_version'> & K


    /** 发送消息 */
    export type SendMessage<D extends Record<'detail_type', any> = SendMessage.Private | SendMessage.Group | SendMessage.Channel, K extends ExtendedMap = {}> = _Base<'send_message', D> & K

    export namespace SendMessage {

        export interface Private {
            /** 发送的类型，和**消息事件**的 `detail_type` 字段对应 */
            detail_type: 'private'
            /** 用户 ID，当 `detail_type` 为 `private` 时必须传入 */
            user_id: string
            /** 消息内容 */
            message: Message
        }

        export interface Group {
            /** 发送的类型，和**消息事件**的 `detail_type` 字段对应 */
            detail_type: 'group'
            /** 群 ID，当 `detail_type` 为 `group` 时必须传入 */
            user_id: string
            /** 消息内容 */
            message: Message
        }

        export interface Channel {
            /** 发送的类型，和**消息事件**的 `detail_type` 字段对应 */
            detail_type: 'channel'
            /** 频道 ID，当 `detail_type` 为 `channel` 时必须传入 */
            channel_id: string
            /** Guild 群组 ID，当 detail_type 为 channel 时必须传入 */
            guild_id: string
            /** 消息内容 */
            message: Message
        }

    }

    /** 撤回消息 */
    export type DeleteMessage<K extends ExtendedMap = {}> = _Base<'delete_message', _BaseDeleteMessage> & K

    export interface _BaseDeleteMessage {
        /** 唯一的消息 ID */
        message_id: string
    }

    /** 获取消息 */
    export type GetMessage<K extends ExtendedMap = {}> = _Base<'get_message', _BaseGetMessage> & K

    export interface _BaseGetMessage {
        /** 唯一的消息 ID */
        message_id: string
    }


    /** 获取机器人自身信息 */
    export type GetSelfInfo<K extends ExtendedMap = {}> = _Base<'get_self_info'> & K

    /** 获取用户信息 */
    export type GetUserInfo<K extends ExtendedMap = {}> = _Base<'get_user_info', _BaseGetUserInfo> & K

    export interface _BaseGetUserInfo {
        /** 用户 ID，可以是好友，也可以是陌生人 */
        user_id: string
    }

    /** 获取好友列表
     * - 获取机器人的关注者或好友列表
    */
    export type GetFriendList<K extends ExtendedMap = {}> = _Base<'get_friend_list'> & K


    /** 获取群信息 */
    export type GetGroupInfo<K extends ExtendedMap = {}> = _Base<'get_group_info', _BaseGetGroupInfo> & K

    export interface _BaseGetGroupInfo {
        /** 群 ID */
        group_id: string
    }

    /** 获取群列表
     * - 获取机器人加入的群列表
    */
    export type GetGroupList<K extends ExtendedMap = {}> = _Base<'get_group_list'> & K

    /** 获取群成员信息 */
    export type GetGroupMemberInfo<K extends ExtendedMap = {}> = _Base<'get_group_member_info', _BaseGetGroupMemberInfo> & K

    export interface _BaseGetGroupMemberInfo {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
    }

    /** 获取群成员列表 */
    export type GetGroupMemberList<K extends ExtendedMap = {}> = _Base<'get_group_member_list', _BaseGetGroupMemberList> & K

    export interface _BaseGetGroupMemberList {
        /** 群 ID */
        group_id: string
    }

    /** 设置群名称 */
    export type SetGroupName<K extends ExtendedMap = {}> = _Base<'set_group_name', _BaseSetGroupName> & K

    export interface _BaseSetGroupName {
        /** 群 ID */
        group_id: string
        /** 新群名称 */
        group_name: string
    }

    /** 退出群 */
    export type LeaveGroup<K extends ExtendedMap = {}> = _Base<'leave_group', _BaseLeaveGroup> & K

    export interface _BaseLeaveGroup {
        /** 群 ID */
        group_id: string
    }


    /** 获取群组信息 */
    export type GetGuildInfo<K extends ExtendedMap = {}> = _Base<'get_guild_info', _BaseGetGuildInfo> & K

    export interface _BaseGetGuildInfo {
        /** 群组 ID */
        guild_id: string
    }

    /** 获取群组列表
     * - 获取机器人加入的群组列表
    */
    export type GetGuildList<K extends ExtendedMap = {}> = _Base<'get_guild_list'> & K

    /** 获取频道信息 */
    export type GetChannelInfo<K extends ExtendedMap = {}> = _Base<'get_channel_info', _BaseGetChannelInfo> & K

    export interface _BaseGetChannelInfo {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
    }

    /** 获取频道列表
     * - 获取指定群组中的频道列表
    */
    export type GetChannelList<K extends ExtendedMap = {}> = _Base<'get_channel_list', _BaseGetChannelList> & K

    export interface _BaseGetChannelList {
        /** 群组 ID */
        guild_id: string
    }

    /** 获取群组成员信息 */
    export type GetGuildMemberInfo<K extends ExtendedMap = {}> = _Base<'get_guild_member_info', _BaseGetGuildMemberInfo> & K

    export interface _BaseGetGuildMemberInfo {
        /** 群组 ID */
        guild_id: string
        /** 用户 ID */
        user_id: string
    }

    /** 获取群组成员列表 */
    export type GetGuildMemberList<K extends ExtendedMap = {}> = _Base<'get_guild_member_list', _BaseGetGuildMemberList> & K

    export interface _BaseGetGuildMemberList {
        /** 群组 ID */
        guild_id: string
    }

    /** 设置群组名称 */
    export type SetGuildName<K extends ExtendedMap = {}> = _Base<'set_guild_name', _BaseSetGuildName> & K

    export interface _BaseSetGuildName {
        /** 群组 ID */
        guild_id: string
        /** 新群组名称 */
        guild_name: string
    }

    /** 设置频道名称 */
    export type SetChannelName<K extends ExtendedMap = {}> = _Base<'set_channel_name', _BaseSetChannelName> & K

    export interface _BaseSetChannelName {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
        /** 新频道名称 */
        channel_name: string
    }

    /** 退出群组 */
    export type LeaveGuild<K extends ExtendedMap = {}> = _Base<'leave_guild', _BaseLeaveGuild> & K

    export interface _BaseLeaveGuild {
        /** 群组 ID */
        guild_id: string
    }


    /** 上传文件 */
    export type UploadFile<T extends Record<'type', any> = UploadFile.Url | UploadFile.Path | UploadFile.Data, K extends ExtendedMap = {}> = _Base<'upload_file', T> & K

    export namespace UploadFile {

        export interface Url {
            /** 文件名，如 `foo.jpg` */
            name: string
            /** 文件数据（原始二进制）的 SHA256 校验和，全小写，可选传入 */
            sha256?: string
            /** 上传文件的方式 */
            type: 'url'
            /** 文件 URL，当 `type` 为 `url` 时必须传入，OneBot 实现必须支持以 HTTP(S) 协议从此 URL 下载要上传的文件 */
            url: string
            /** 下载 URL 时需要添加的 HTTP 请求头，可选传入，当 `type` 为 `url` 时 OneBot 实现必须在请求 URL 时加上这些请求头 */
            headers?: Record<string, string>
        }

        export interface Path {
            /** 文件名，如 `foo.jpg` */
            name: string
            /** 文件数据（原始二进制）的 SHA256 校验和，全小写，可选传入 */
            sha256?: string
            /** 上传文件的方式 */
            type: 'path'
            /** 文件路径，当 `type` 为 `path` 时必须传入，OneBot 实现必须能从此路径访问要上传的文件 */
            path: string
        }

        export interface Data {
            /** 文件名，如 `foo.jpg` */
            name: string
            /** 文件数据（原始二进制）的 SHA256 校验和，全小写，可选传入 */
            sha256?: string
            /** 上传文件的方式 */
            type: 'data'
            /** 文件数据，当 `type` 为 `data` 时必须传入 */
            data: ArrayBuffer | string
        }

    }

    /** 分片上传文件 */
    export type UploadFileFragmented<T extends Record<'stage', any> = UploadFileFragmented.Prepare | UploadFileFragmented.Transfer | UploadFileFragmented.Finish, K extends ExtendedMap = {}> = _Base<'upload_file_fragmented', T> & K

    export namespace UploadFileFragmented {

        export interface Prepare {
            /** 上传阶段，必须为 `prepare` */
            stage: 'prepare'
            /** 文件名，如 `foo.jpg` */
            name: string
            /** 文件完整大小，单位：字节 */
            total_size: number
        }

        export interface Transfer {
            /** 上传阶段，必须为 `transfer` */
            stage: 'transfer'
            /** 准备阶段返回的文件 ID */
            file_id: string
            /** 本次传输的文件偏移，单位：字节 */
            offset: number
            /** 本次传输的文件大小，单位：字节 */
            size: number
            /** 本次传输的文件数据 */
            data: ArrayBuffer | string
        }

        export interface Finish {
            /** 上传阶段，必须为 `finish` */
            stage: 'finish'
            /** 准备阶段返回的文件 ID */
            file_id: string
            /** 整个文件的 SHA256 校验和，全小写 */
            sha256: string
        }

    }

    /** 获取文件 */
    export type GetFile<K extends ExtendedMap = {}> = _Base<'get_file', _BaseGetFile> & K

    export interface _BaseGetFile {
        /** 文件 ID */
        file_id: string
        /** 获取文件的方式，可以为 `url`、`path`、`data` 或扩展的方式 */
        type: string
    }

    /** 分片获取文件 */
    export type GetFileFragmented<T extends Record<'stage', any> = GetFileFragmented.Prepare | GetFileFragmented.Transfer, K extends ExtendedMap = {}> = _Base<'get_file_fragmented', T> & K

    export namespace GetFileFragmented {

        export interface Prepare {
            /** 上传阶段，必须为 `prepare` */
            stage: 'prepare'
            /** 文件 ID */
            file_id: string
        }
        export interface Transfer {
            /** 上传阶段，必须为 `transfer` */
            stage: 'transfer'
            /** 文件 ID */
            file_id: string
            /** 本次传输的文件偏移，单位：字节 */
            offset: number
            /** 本次传输的文件大小，单位：字节 */
            size: number
        }
    }
}