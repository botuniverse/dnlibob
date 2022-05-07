import { Message } from "./message/index.ts";

/// OneBot 12 标准动作
export type StandardAction = BaseAction<SendMessage, "send_message"> | BaseAction<GetLatestEvents, "get_latest_events"> | BaseAction<DeleteMessage, "delete_message"> | BaseAction<GetMessage, "get_message"> | BaseAction<GetUserInfo, "get_user_info"> | BaseAction<GetGroupInfo, "get_group_info"> | BaseAction<GetGroupMemberList, "get_group_member_list"> | BaseAction<LeaveGroup, "leave_group"> | BaseAction<GetGroupMemberInfo, "get_group_member_info"> | BaseAction<KickGroupMember, "kick_group_member"> | BaseAction<BanGroupMember, "ban_group_member"> | BaseAction<UnbanGroupMember, "unban_group_member"> | BaseAction<SetGroupAdmin, "set_group_admin"> | BaseAction<UnsetGroupAdmin, "unset_group_admin"> | BaseAction<SetGroupName, "set_group_name"> | BaseAction<UploadFile, "upload_file"> | BaseAction<GetFile, "get_file"> | BaseAction<Extended, "get_status"> | BaseAction<Extended, "get_version"> | BaseAction<Extended, "get_self_info"> | BaseAction<Extended, "get_friend_list"> | BaseAction<Extended, "get_group_list"> | BaseAction<UploadFileFragmented<"prepare", UploadFileFragmented.Prepare> | UploadFileFragmented<"transfer", UploadFileFragmented.Transfer> | UploadFileFragmented<"finish", UploadFileFragmented.Finish>, "upload_file_fragmented"> | BaseAction<GetFileFragmented<"prepare", GetFileFragmented.Prepare> | GetFileFragmented<"transfer", GetFileFragmented.Transfer>, "get_file_fragmented"> | BaseAction<Extended, "get_supported_actions">;

/// OneBot 12 扩展动作
export interface ExtendedAction {
    action: string,
    params: Extended,
}

export type BaseAction<T, E> = {
    action: E,
    params: T
}

export interface Extended {
    [prop: string]: any
}

export interface SendMessage extends Extended {
    detail_type: "private" | "group" | string,
    group_id?: string,
    user_id?: string,
    message: Message,
}

export interface GetLatestEvents extends Extended {
    limit: number,
    timeout: number,
}

export interface DeleteMessage extends Extended {
    message_id: string,
}

export interface GetMessage extends Extended {
    message_id: string,
}

export interface GetUserInfo extends Extended {
    user_id: string,
}

export interface GetGroupInfo extends Extended {
    group_id: string,
}

export interface GetGroupMemberList extends Extended {
    group_id: string,
}

export interface LeaveGroup extends Extended {
    group_id: string,
}

export interface GetGroupMemberInfo extends Extended {
    group_id: string,
    user_id: string,
}

export interface KickGroupMember extends Extended {
    group_id: string,
    user_id: string,
}

export interface BanGroupMember extends Extended {
    group_id: string,
    user_id: string,
}

export interface UnbanGroupMember extends Extended {
    group_id: string,
    user_id: string,
}

export interface SetGroupAdmin extends Extended {
    group_id: string,
    user_id: string,
}

export interface UnsetGroupAdmin extends Extended {
    group_id: string,
    user_id: string,
}

export interface SetGroupName extends Extended {
    group_id: string,
    group_name: string,
}

export type UploadFile = {
    type: "url",
    name: string,
    url: String,
    headers?: Record<string, string>,
    sha256?: string,
    [prop: string]: any
} | {
    type: "path",
    name: string,
    headers?: Record<string, string>,
    path: string,
    sha256?: string,
    [prop: string]: any
} | {
    type: "data",
    name: string,
    headers?: Record<string, string>,
    data: number[],
    sha256?: string,
    [prop: string]: any
} | {
    type: string,
    name: string,
    headers?: Record<string, string>,
    sha256?: string,
    [prop: string]: any
}

export interface GetFile extends Extended {
    file_id: string,
    type: string,
}

export type UploadFileFragmented<T, E> = {
    stage: T
} & E

export namespace UploadFileFragmented {
    export interface Prepare extends Extended {
        name: string,
        total: number,
        sha256: string,
    }
    export interface Transfer extends Extended {
        file_id: string,
        offset: number,
        size: number,
        data: number[],
    }
    export interface Finish extends Extended {
        file_id: string,
    }
}

export type GetFileFragmented<T, E> = {
    stage: T
} & E

export namespace GetFileFragmented {
    export interface Prepare extends Extended {
        file_id: string,
    }
    export interface Transfer extends Extended {
        file_id: string,
        offset: number,
        size: number,
    }
}