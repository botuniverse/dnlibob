import { StandardEvent } from './event/mod.ts'
import { ExtendedMap } from './utils/value.ts'

/** 动作响应
 * - **动作响应**是 OneBot 实现收到应用端的动作请求并处理完毕后，发回应用端的数据
 * */
export interface Resp<T> {
    /** 执行状态（成功与否），必须是 `ok`、`failed` 中的一个，分别表示执行成功和失败 */
    status: 'ok' | 'failed'
    /** 返回码，必须符合 OneBot 标准定义的返回码规则 */
    retcode: number
    /** 响应数据 */
    data: T
    /** 错误信息，当动作执行失败时，建议在此填写人类可读的错误信息，当执行成功时，应为空字符串 */
    message: string
}

export type RespContent = RespContent.GetLatestEvents | RespContent.GetSupportActions | RespContent.GetStatus | RespContent.SendMessage | RespContent.GetSelfInfo | RespContent.GetUserInfo | RespContent.GetFriendList | RespContent.GetGroupInfo | RespContent.GetGroupList | RespContent.GetGroupMemberInfo | RespContent.GetGroupMemberList | RespContent.GetGuildInfo | RespContent.GetGuildList | RespContent.GetChannelInfo | RespContent.GetChannelList | RespContent.GetGuildMemberInfo | RespContent.GetGuildMemberList | RespContent.Other

export type Resps = Resp<RespContent>

export namespace RespContent {

    export type GetLatestEvents<E extends StandardEvent = StandardEvent> = E[]

    export type GetSupportActions = string[]

    export type GetStatus<K extends ExtendedMap = {}> = _BaseStatus & K

    export interface _BaseStatus {
        /** 是否各项状态都符合预期，OneBot 实现各模块均正常 */
        good: boolean
        /** OneBot 实现对接的平台连接是否顺畅（如 QQ 平台为是否在线），是 `good` 的必要条件之一 */
        online: boolean
    }

    export interface GetVersion {
        /** OneBot 实现名称，格式 `[_a-z]+` */
        impl: string
        /** OneBot 实现平台名称，格式 `[_a-z]+` */
        platform: string
        /** OneBot 实现的版本号 */
        version: string
        /** OneBot 实现的 OneBot 标准版本号 */
        onebot_version: string
    }
    
    export namespace GetVersion {
        export function Default(): GetVersion {
            return {
                impl: "TL_default",
                platform: "empty",
                version: "0.0.0",
                onebot_version: "12",
            }
        }
    }


    export type SendMessage<K extends ExtendedMap = {}> = _BaseSendMessage & K

    export interface _BaseSendMessage {
        /** 消息 ID */
        message_id: string
        /** 消息成功发出的时间（Unix 时间戳），单位：秒 */
        time: number
    }


    export type GetSelfInfo<K extends ExtendedMap = {}> = _BaseGetSelfInfo & K

    export interface _BaseGetSelfInfo {
        /** 机器人用户 ID */
        user_id: string
        /** 机器人名称/昵称 */
        nickname: string
    }

    export type GetUserInfo<K extends ExtendedMap = {}> = _BaseGetUserInfo & K

    export interface _BaseGetUserInfo {
        /** 用户 ID */
        user_id: string
        /** 用户名称/昵称 */
        nickname: string
    }

    export type GetFriendList = _BaseGetUserInfo[]


    export type GetGroupInfo<K extends ExtendedMap = {}> = _BaseGetGroupInfo & K

    export interface _BaseGetGroupInfo {
        /** 群 ID */
        group_id: string
    }

    export type GetGroupList = _BaseGetGroupInfo[]

    export type GetGroupMemberInfo<K extends ExtendedMap = {}> = _BaseGetGroupMemberInfo & K

    export interface _BaseGetGroupMemberInfo {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
    }

    export type GetGroupMemberList = _BaseGetGroupMemberInfo[]


    export type GetGuildInfo<K extends ExtendedMap = {}> = _BaseGetGuildInfo & K

    export interface _BaseGetGuildInfo {
        /** 群组 ID */
        guild_id: string
        /** 群组名称 */
        guild_name: string
    }

    export type GetGuildList = _BaseGetGuildInfo[]

    export type GetChannelInfo<K extends ExtendedMap = {}> = _BaseGetChannelInfo & K

    export interface _BaseGetChannelInfo {
        /** 频道 ID */
        channel_id: string
        /** 频道名称 */
        channel_name: string
    }

    export type GetChannelList = _BaseGetChannelInfo[]

    export type GetGuildMemberInfo<K extends ExtendedMap = {}> = _BaseGetGuildMemberInfo & K

    export interface _BaseGetGuildMemberInfo {
        /** 用户 ID */
        user_id: string
        /** 用户名称/昵称 */
        nickname: string
    }

    export type GetGuildMemberList = _BaseGetGuildMemberInfo[]


    export type UploadFile<K extends ExtendedMap = {}> = _BaseUploadFile & K

    export interface _BaseUploadFile {
        /** 文件 ID，可供以后使用 */
        file_id: string
    }

    export type UploadFileFragmented<K extends ExtendedMap = {}> = (UploadFileFragmented.Prepare | UploadFileFragmented.Transfer | UploadFileFragmented.Finish) & K

    export namespace UploadFileFragmented {

        export interface Prepare {
            /** 文件 ID，仅传输阶段使用 */
            file_id: string
        }

        export interface Transfer {
        }

        export interface Finish {
            /** 文件 ID，可供以后使用 */
            file_id: string
        }

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

    export type GetFileFragmented<K extends ExtendedMap = {}> = (GetFileFragmented.Prepare | GetFileFragmented.Transfer) & K

    export namespace GetFileFragmented {

        export interface Prepare {
            /** 文件名，如 `foo.jpg` */
            name: string
            /** 文件完整大小，单位：字节 */
            total_size: number
            /** 整个文件的 SHA256 校验和，全小写 */
            sha256: string
        }

        export interface Transfer {
        }

        export interface Finish {
            /** 本次传输的文件数据 */
            data: ArrayBuffer | string
        }

    }

    export type Other<K extends ExtendedMap = {}> = K
}

export namespace Resp {

    export function success<T>(data: T): Resp<T> {
        return {
            status: 'ok',
            retcode: 0,
            data,
            message: ''
        }
    }

    export function fail<T>(data: T, retcode: number, message: string): Resp<T> {
        return {
            status: 'failed',
            retcode,
            data,
            message
        }
    }


    export function empty_success(): Resp<RespContent.Other> {
        return Resp.success({})
    }

    export function empty_fail(retcode: number, message: string): Resp<RespContent.Other> {
        return Resp.fail({}, retcode, message)
    }


    export function bad_request(): Resp<RespContent.Other> {
        return Resp.empty_fail(10001, '无效的动作请求')
    }

    export function unsupported_action(): Resp<RespContent.Other> {
        return Resp.empty_fail(10002, '不支持的动作请求')
    }

    export function bad_param(): Resp<RespContent.Other> {
        return Resp.empty_fail(10003, '无效的动作请求参数')
    }

    export function unsupported_param(): Resp<RespContent.Other> {
        return Resp.empty_fail(10004, '不支持的动作请求参数')
    }

    export function unsupported_segment(): Resp<RespContent.Other> {
        return Resp.empty_fail(10005, '不支持的消息段类型')
    }

    export function bad_segment_data(): Resp<RespContent.Other> {
        return Resp.empty_fail(10006, '无效的消息段参数')
    }

    export function unsupported_segment_data(): Resp<RespContent.Other> {
        return Resp.empty_fail(10007, '不支持的消息段参数')
    }


    export function bad_handler(): Resp<RespContent.Other> {
        return Resp.empty_fail(20001, '动作处理器实现错误')
    }

    export function internal_handler(): Resp<RespContent.Other> {
        return Resp.empty_fail(20002, '动作处理器运行时抛出异常')
    }


    export function database_error(): Resp<RespContent.Other> {
        return Resp.empty_fail(31000, '数据库错误')
    }

    export function filesystem_error(): Resp<RespContent.Other> {
        return Resp.empty_fail(32000, '文件系统错误')
    }

    export function network_error(): Resp<RespContent.Other> {
        return Resp.empty_fail(33000, '网络错误')
    }

    export function platform_error(): Resp<RespContent.Other> {
        return Resp.empty_fail(34000, '平台错误')
    }

    export function tired(): Resp<RespContent.Other> {
        return Resp.empty_fail(36000, 'I Am Tired!')
    }
}