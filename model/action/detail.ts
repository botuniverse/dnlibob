import { Self } from '../share.ts'
import { Message } from '../message/mod.ts'

interface Action {
    /** 动作名称，如 `send_message` */
    action: string
    /** 动作参数 */
    params: unknown
    /** 可以用于唯一标识一个动作请求 */
    echo?: string
    /** 机器人自身标识 */
    self?: Self
}

/** 获取最新事件列表
 * - 仅 HTTP 通信方式必须支持，用于轮询获取事件。
*/
export interface GetLatestEvents extends Action {
    action: 'get_latest_events'
    params: {
        /** 获取的事件数量上限，0 表示不限制 */
        limit?: number
        /** 没有事件时最多等待的秒数，0 表示使用短轮询，不等待 */
        timeout?: number
    }
}

/** 获取支持的动作列表 */
export interface GetSupportedActions extends Action {
    action: 'get_supported_actions'
    params: Record<never, never>
}

/** 获取运行状态 */
export interface GetStatus extends Action {
    action: 'get_status'
    params: Record<never, never>
}

/** 获取版本信息 */
export interface GetVersion extends Action {
    action: 'get_version'
    params: Record<never, never>
}

/** 发送消息 */
export interface SendMessage extends Action {
    action: 'send_message'
    params: {
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
}

/** 撤回消息 */
export interface DeleteMessage extends Action {
    action: 'delete_message'
    params: {
        /** 唯一的消息 ID */
        message_id: string
    }
}

/** 获取机器人自身信息 */
export interface GetSelfInfo extends Action {
    action: 'get_self_info'
    params: Record<never, never>
}

/** 获取用户信息 */
export interface GetUserInfo extends Action {
    action: 'get_user_info'
    params: {
        /** 用户 ID，可以是好友，也可以是陌生人 */
        user_id: string
    }
}

/** 获取好友列表
 * - 获取机器人的关注者或好友列表
*/
export interface GetFriendList extends Action {
    action: 'get_friend_list'
    params: Record<never, never>
}

/** 获取群信息 */
export interface GetGroupInfo extends Action {
    action: 'get_group_info'
    params: {
        /** 群 ID */
        group_id: string
    }
}

/** 获取群列表
 * - 获取机器人加入的群列表
*/
export interface GetGroupList extends Action {
    action: 'get_group_list'
    params: Record<never, never>
}

/** 获取群成员信息 */
export interface GetGroupMemberInfo extends Action {
    action: 'get_group_member_info'
    params: {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
    }
}

/** 获取群成员列表 */
export interface GetGroupMemberList extends Action {
    action: 'get_group_member_list'
    params: {
        /** 群 ID */
        group_id: string
    }
}

/** 设置群名称 */
export interface SetGroupName extends Action {
    action: 'set_group_name'
    params: {
        /** 群 ID */
        group_id: string
        /** 新群名称 */
        group_name: string
    }
}

/** 退出群 */
export interface LeaveGroup extends Action {
    action: 'leave_group'
    params: {
        /** 群 ID */
        group_id: string
    }
}

/** 获取群组信息 */
export interface GetGuildInfo extends Action {
    action: 'get_guild_info'
    params: {
        /** 群组 ID */
        guild_id: string
    }
}

/** 获取群组列表
 * - 获取机器人加入的群组列表
*/
export interface GetGuildList extends Action {
    action: 'get_guild_list'
    params: Record<never, never>
}

/** 设置群组名称 */
export interface SetGuildName extends Action {
    action: 'set_guild_name'
    params: {
        /** 群组 ID */
        guild_id: string
        /** 新群组名称 */
        guild_name: string
    }
}

/** 获取群组成员信息 */
export interface GetGuildMemberInfo extends Action {
    action: 'get_guild_member_info'
    params: {
        /** 群组 ID */
        guild_id: string
        /** 用户 ID */
        user_id: string
    }
}

/** 获取群组成员列表 */
export interface GetGuildMemberList extends Action {
    action: 'get_guild_member_list'
    params: {
        /** 群组 ID */
        guild_id: string
    }
}

/** 退出群组 */
export interface LeaveGuild extends Action {
    action: 'leave_guild'
    params: {
        /** 群组 ID */
        guild_id: string
    }
}

/** 获取频道信息 */
export interface GetChannelInfo extends Action {
    action: 'get_channel_info'
    params: {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
    }
}

/** 获取频道列表
 * - 获取指定群组中机器人可见的频道列表
*/
export interface GetChannelList extends Action {
    action: 'get_channel_list'
    params: {
        /** 群组 ID */
        guild_id: string
        /** 只获取机器人账号已加入的频道列表 */
        joined_only?: boolean
    }
}

/** 设置频道名称 */
export interface SetChannelName extends Action {
    action: 'set_channel_name'
    params: {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
        /** 新频道名称 */
        channel_name: string
    }
}

/** 获取频道成员信息 */
export interface GetChannelMemberInfo extends Action {
    action: 'get_channel_member_info'
    params: {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
        /** 用户 ID */
        user_id: string
    }
}

/** 获取频道成员列表 */
export interface GetChannelMemberList extends Action {
    action: 'get_channel_member_list'
    params: {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
    }
}

/** 退出频道 */
export interface LeaveChannel extends Action {
    action: 'leave_channel'
    params: {
        /** 频道 ID */
        channel_id: string
        /** 群组 ID */
        guild_id: string
    }
}

/** 上传文件 */
export interface UploadFile extends Action {
    action: 'upload_file'
    params: {
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
}

/** 分片上传文件
 *  - 准备阶段
 */
export interface UploadFileFragmentedPrepare extends Action {
    action: 'upload_file_fragmented'
    params: {
        /** 上传阶段，必须为 `prepare` */
        stage: 'prepare'
        /** 文件名，如 `foo.jpg` */
        name: string
        /** 文件完整大小，单位：字节 */
        total_size: number
    }
}

/** 分片上传文件
 *  - 传输阶段
 */
export interface UploadFileFragmentedTransfer extends Action {
    action: 'upload_file_fragmented'
    params: {
        /** 上传阶段，必须为 `transfer` */
        stage: 'transfer'
        /** 准备阶段返回的文件 ID */
        file_id: string
        /** 本次传输的文件偏移，单位：字节 */
        offset: number
        /** 本次传输的文件数据 */
        data: ArrayBuffer | string
    }
}

/** 分片上传文件
 *  - 结束阶段
 */
export interface UploadFileFragmentedFinish extends Action {
    action: 'upload_file_fragmented'
    params: {
        /** 上传阶段，必须为 `finish` */
        stage: 'finish'
        /** 准备阶段返回的文件 ID */
        file_id: string
        /** 整个文件的 SHA256 校验和，全小写 */
        sha256: string
    }
}

/** 获取文件 */
export interface GetFile extends Action {
    action: 'get_file'
    params: {
        /** 文件 ID */
        file_id: string
        /** 获取文件的方式，可以为 `url`、`path`、`data` 或扩展的方式 */
        type: string
    }
}

/** 分片获取文件
 * - 准备阶段
 */
export interface GetFileFragmentedPrepare extends Action {
    action: 'get_file_fragmented'
    params: {
        /** 上传阶段，必须为 `prepare` */
        stage: 'prepare'
        /** 文件 ID */
        file_id: string
    }
}

/** 分片获取文件
 * - 传输阶段
 */
export interface GetFileFragmentedTransfer extends Action {
    action: 'get_file_fragmented'
    params: {
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
