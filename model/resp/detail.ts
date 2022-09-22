import { AllEvents } from '../event/mod.ts'
import { Status } from '../types.ts'

interface Resp {
    /** 执行状态（成功与否），必须是 `ok`、`failed` 中的一个，分别表示执行成功和失败 */
    status: string
    /** 返回码，必须符合 OneBot 12 文档所定义的返回码规则 */
    retcode: number
    /** 响应数据 */
    data: unknown
    /** 错误信息，当动作执行失败时，建议在此填写人类可读的错误信息，当执行成功时，应为空字符串 */
    message: string
    /** 应原样返回动作请求中的 `echo` 字段值 */
    echo?: string
}

/** 获取最新事件列表
 * - 仅 HTTP 通信方式必须支持，用于轮询获取事件。
*/
export interface GetLatestEvents extends Resp {
    data: AllEvents[]
}

/** 获取支持的动作列表 */
export interface GetSupportedActions extends Resp {
    data: string[]
}

/** 获取运行状态 */
export interface GetStatus extends Resp {
    data: Status
}

/** 获取版本信息 */
export interface GetVersion extends Resp {
    data: {
        /** OneBot 实现名称 */
        impl: string
        /** OneBot 实现的版本号 */
        version: string
        /** OneBot 实现的 OneBot 标准版本号 */
        onebot_version: string
    }
}

/** 发送消息 */
export interface SendMessage extends Resp {
    data: {
        /** 消息 ID */
        message_id: string
        /** 消息成功发出的时间（Unix 时间戳），单位：秒 */
        time: number
    }
}

/** 撤回消息 */
export interface DeleteMessage extends Resp {
    data: null
}

/** 获取机器人自身信息 */
export interface GetSelfInfo extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的显示名称，若无则为空字符串 */
        user_displayname: string
    }
}

/** 获取用户信息 */
export interface GetUserInfo extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的显示名称，若无则为空字符串 */
        user_displayname: string
        /** 机器人账号对该用户的备注名称，若无则为空字符串 */
        user_remark: string
    }
}

/** 获取好友列表
 * - 获取机器人的关注者或好友列表
*/
export interface GetFriendList extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的显示名称，若无则为空字符串 */
        user_displayname: string
        /** 机器人账号对该用户的备注名称，若无则为空字符串 */
        user_remark: string
    }[]
}

/** 获取群信息 */
export interface GetGroupInfo extends Resp {
    data: {
        /** 群 ID */
        group_id: string
        /** 群名称 */
        group_name: string
    }
}

/** 获取群列表
 * - 获取机器人加入的群列表
*/
export interface GetGroupList extends Resp {
    data: {
        /** 群 ID */
        group_id: string
        /** 群名称 */
        group_name: string
    }[]
}

/** 获取群成员信息 */
export interface GetGroupMemberInfo extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的群内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }
}

/** 获取群成员列表 */
export interface GetGroupMemberList extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的群内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }[]
}

/** 设置群名称 */
export interface SetGroupName extends Resp {
    data: null
}

/** 退出群 */
export interface LeaveGroup extends Resp {
    data: null
}

/** 获取群组信息 */
export interface GetGuildInfo extends Resp {
    data: {
        /** 群组 ID */
        guild_id: string
        /** 群组名称 */
        guild_name: string
    }
}

/** 获取群组列表
 * - 获取机器人加入的群组列表
*/
export interface GetGuildList extends Resp {
    data: {
        /** 群组 ID */
        guild_id: string
        /** 群组名称 */
        guild_name: string
    }[]
}

/** 设置群组名称 */
export interface SetGuildName extends Resp {
    data: null
}

/** 获取群组成员信息 */
export interface GetGuildMemberInfo extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的群内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }
}

/** 获取群组成员列表 */
export interface GetGuildMemberList extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的群组内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }[]
}

/** 退出群组 */
export interface LeaveGuild extends Resp {
    data: null
}

/** 获取频道信息 */
export interface GetChannelInfo extends Resp {
    data: {
        /** 频道 ID */
        channel_id: string
        /** 频道名称 */
        channel_name: string
    }
}

/** 获取频道列表
 * - 获取指定群组中机器人可见的频道列表
*/
export interface GetChannelList extends Resp {
    data: {
        /** 频道 ID */
        channel_id: string
        /** 频道名称 */
        channel_name: string
    }[]
}

/** 设置频道名称 */
export interface SetChannelName extends Resp {
    data: null
}

/** 获取频道成员信息 */
export interface GetChannelMemberInfo extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的频道内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }
}

/** 获取频道成员列表 */
export interface GetChannelMemberList extends Resp {
    data: {
        /** 用户 ID */
        user_id: string
        /** 用户名称/姓名/昵称 */
        user_name: string
        /** 用户设置的频道内显示名称或账号显示名称，若无则为空字符串 */
        user_displayname: string
    }[]
}

/** 退出频道 */
export interface LeaveChannel extends Resp {
    data: null
}

/** 上传文件 */
export interface UploadFile extends Resp {
    data: {
        /** 文件 ID，可供以后使用 */
        file_id: string
    }
}

/** 分片上传文件
 *  - 准备阶段
 */
export interface UploadFileFragmentedPrepare extends Resp {
    data: {
        /** 文件 ID，仅传输阶段使用 */
        file_id: string
    }
}

/** 分片上传文件
 *  - 传输阶段
 */
export interface UploadFileFragmentedTransfer extends Resp {
    data: null
}

/** 分片上传文件
 *  - 结束阶段
 */
export interface UploadFileFragmentedFinish extends Resp {
    data: {
        /** 文件 ID，可供以后使用 */
        file_id: string
    }
}

/** 获取文件 */
export interface GetFile extends Resp {
    data: {
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
        sha256: string
    }
}

/** 分片获取文件
 * - 准备阶段
 */
export interface GetFileFragmentedPrepare extends Resp {
    data: {
        /** 文件名，如 `foo.jpg` */
        name: string
        /** 文件完整大小，单位：字节 */
        total_size: number
        /** 整个文件的 SHA256 校验和，全小写 */
        sha256: string
    }
}

/** 分片获取文件
 * - 传输阶段
 */
export interface GetFileFragmentedTransfer extends Resp {
    data: {
        /** 本次传输的文件数据 */
        data: ArrayBuffer | string
    }
}