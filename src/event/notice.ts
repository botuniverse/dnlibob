export type NoticeContent = NoticeContent.GroupMemberIncrease | NoticeContent.GroupMemberDecrease | NoticeContent.GroupMemberBan | NoticeContent.GroupMemberUnban | NoticeContent.GroupAdminSet | NoticeContent.GroupAdminUnset | NoticeContent.GroupMessageDelete | NoticeContent.PrivateMessageDelete | NoticeContent.FriendDecrease | NoticeContent.FriendIncrease

export namespace NoticeContent {
    export interface GroupMemberIncrease {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupMemberDecrease {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupMemberBan {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupMemberUnban {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupAdminSet {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupAdminUnset {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface GroupMessageDelete {
        sub_type: string,
        group_id: string,
        message_id: string,
        user_id: string,
        operator_id: string,
        detail_type: string
    }
    export interface FriendIncrease {
        sub_type: string,
        user_id: string,
        detail_type: string
    }
    export interface FriendDecrease {
        sub_type: string,
        user_id: string,
        detail_type: string
    }
    export interface PrivateMessageDelete {
        sub_type: string,
        message_id: string,
        user_id: string,
        detail_type: string
    }
}