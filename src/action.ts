import { Message } from "./message/index.ts";

export type StandardAction = BaseAction<SendMessage, StandardActionEnum.SendMessage> | BaseAction<GetLatestEvents, StandardActionEnum.GetLatestEvents> | BaseAction<DeleteMessage, StandardActionEnum.DeleteMessage> | BaseAction<GetMessage, StandardActionEnum.GetMessage> | BaseAction<GetUserInfo, StandardActionEnum.GetUserInfo> | BaseAction<GetGroupInfo, StandardActionEnum.GetGroupInfo> | BaseAction<GetGroupMemberList, StandardActionEnum.GetGroupMemberList> | BaseAction<LeaveGroup, StandardActionEnum.LeaveGroup> | BaseAction<GetGroupMemberInfo, StandardActionEnum.GetGroupMemberInfo> | BaseAction<KickGroupMember, StandardActionEnum.KickGroupMember> | BaseAction<BanGroupMember, StandardActionEnum.BanGroupMember> | BaseAction<UnbanGroupMember, StandardActionEnum.UnbanGroupMember> | BaseAction<SetGroupAdmin, StandardActionEnum.SetGroupAdmin> | BaseAction<UnsetGroupAdmin, StandardActionEnum.UnsetGroupAdmin> | BaseAction<SetGroupName, StandardActionEnum.SetGroupName> | BaseAction<UploadFile, StandardActionEnum.UploadFile> | BaseAction<GetFile, StandardActionEnum.GetFile> | BaseAction<Extended, StandardActionEnum.GetStatus> | BaseAction<Extended, StandardActionEnum.GetVersion> | BaseAction<Extended, StandardActionEnum.GetSelfInfo> | BaseAction<Extended, StandardActionEnum.GetFriendList> | BaseAction<Extended, StandardActionEnum.GetGroupList> | BaseAction<UploadFileFragmented.Finish | UploadFileFragmented.Prepare | UploadFileFragmented.Transfer, StandardActionEnum.UploadFileFragmented> | BaseAction<GetFileFragmented.Prepare | GetFileFragmented.Transfer, StandardActionEnum.GetFileFragmented> | BaseAction<Extended, StandardActionEnum.GetSupportedActions>;

export enum StandardActionEnum {
    SendMessage = "send_message",
    GetLatestEvents = "get_latest_events",
    DeleteMessage = "delete_message",
    GetMessage = "get_message",
    GetUserInfo = "get_user_info",
    GetGroupInfo = "get_group_info",
    GetGroupMemberList = "get_group_member_list",
    LeaveGroup = "leave_group",
    GetGroupMemberInfo = "get_group_member_info",
    KickGroupMember = "kick_group_member",
    BanGroupMember = "ban_group_member",
    UnbanGroupMember = "unban_group_member",
    SetGroupAdmin = "set_group_admin",
    UnsetGroupAdmin = "unset_group_admin",
    SetGroupName = "set_group_name",
    UploadFile = "upload_file",
    GetFile = "get_file",
    GetStatus = "get_status",
    GetVersion = "get_version",
    GetSelfInfo = "get_self_info",
    GetFriendList = "get_friend_list",
    GetGroupList = "get_group_list",
    UploadFileFragmented = "upload_file_fragmented",
    GetFileFragmented = "get_file_fragmented",
    GetSupportedActions = "get_supported_actions"
}

export type BaseAction<T, E> = {
    action: E,
    params: T
}

export interface Extended {
    [prop: string]: any
}

export interface SendMessage extends Extended {
    detail_type: string,
    group_id?: string | null,
    user_id?: string | null,
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

export interface UploadFile extends Extended {
    type: string,
    name: string,
    url?: String | null,
    headers?: Record<string, string> | null,
    path?: string | null,
    data?: number[] | null,
    sha256?: string | null,
}

export interface GetFile extends Extended {
    file_id: string,
    type: string,
}

export namespace UploadFileFragmented {
    export interface Prepare {
        name: string,
        total: number,
        sha256: string,
    }
    export interface Transfer {
        file_id: string,
        offset: number,
        size: number,
        data: number[],
    }
    export interface Finish {
        file_id: string,
    }
}

export namespace GetFileFragmented {
    export interface Prepare {
        file_id: string,
    }
    export interface Transfer {
        file_id: string,
        offset: number,
        size: number,
    }
}