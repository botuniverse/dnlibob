import { StandardEvent } from "./event/index.ts"
import { UploadFile } from "./action.ts"

export interface Resp<T> {
    status: string,
    retcode: number,
    data: T,
    message: string,
}

export namespace Resp {
    export function success<T>(data: T): Resp<T> {
        return {
            status: "ok",
            retcode: 0,
            data,
            message: ""
        }
    }
    export function fail<T>(data: T, retcode: number, message: string): Resp<T> {
        return {
            status: "failed",
            retcode,
            data,
            message
        }
    }
    export function tired<T>(data: T): Resp<T> {
        return Resp.fail(data, 36000, "I Am Tired!")
    }
    export function empty_success(): Resp<RespContent.Other> {
        return Resp.success({})
    }
    export function empty_fail(retcode: number, message: string): Resp<RespContent.Other> {
        return Resp.fail({}, retcode, message)
    }
    export function bad_request(): Resp<RespContent.Other> {
        return Resp.empty_fail(10001, "无效的动作请求")
    }
    export function unsupported_action(): Resp<RespContent.Other> {
        return Resp.empty_fail(10002, "不支持的动作请求")
    }
    export function bad_param(): Resp<RespContent.Other> {
        return Resp.empty_fail(10003, "无效的动作请求参数")
    }
    export function unsupported_param(): Resp<RespContent.Other> {
        return Resp.empty_fail(10004, "不支持的动作请求参数")
    }
    export function unsupported_segment(): Resp<RespContent.Other> {
        return Resp.empty_fail(10005, "不支持的消息段类型")
    }
    export function bad_segment_data(): Resp<RespContent.Other> {
        return Resp.empty_fail(10006, "无效的消息段参数")
    }
    export function unsupported_segment_data(): Resp<RespContent.Other> {
        return Resp.empty_fail(10007, "不支持的消息段参数")
    }
}

export namespace RespContent {
    export type SendMessage = SendMessageRespContent
    export type LatestEvents = StandardEvent[]
    export type SupportActions = string[]
    export type Status = StatusContent
    export type Version = VersionContent
    export type MessageEvent = StandardEvent
    export type UserInfo = UserInfoContent
    export type FriendList = UserInfoContent[]
    export type GroupInfo = GroupInfoContent
    export type GroupList = GroupInfoContent[]
    export type FileId = FileIdContent
    export type PrepareFileFragmented = FileFragmentedHead
    export type TransferFileFragmented = number[]
    export type GetFile = UploadFile
    export type Other = Record<string, any>
}

export type RespContent = RespContent.SendMessage | RespContent.LatestEvents | RespContent.SupportActions | RespContent.Status | RespContent.Version | RespContent.MessageEvent | RespContent.UserInfo | RespContent.FriendList | RespContent.GroupInfo | RespContent.GroupList | RespContent.FileId | RespContent.PrepareFileFragmented | RespContent.TransferFileFragmented | RespContent.GetFile | RespContent.Other

export type Resps = Resp<RespContent>

export interface VersionContent {
    impl: string,
    platform: string,
    version: string,
    onebot_version: string,
}

export namespace VersionContent {
    export function Default(): VersionContent {
        return {
            impl: "Tl_default",
            platform: "empty",
            version: "0.0.0",
            onebot_version: "12",
        }
    }
}

export interface SendMessageRespContent {
    message_id: string,
    time: number,
}

export interface UserInfoContent {
    user_id: string,
    nickname: string,
}

export interface GroupInfoContent {
    group_id: string,
    group_name: string,
}

export interface FileIdContent {
    file_id: string,
}

export interface FileContent {
    name: string,
    url?: string,
    headers?: Record<string, string>,
    path?: string,
    data?: [number],
    sha256?: string
}

export interface FileFragmentedHead {
    name: string,
    total_size: number,
    sha256: string
}

export interface StatusContent {
    good: boolean,
    online: boolean
}