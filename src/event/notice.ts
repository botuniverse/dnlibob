export type NoticeContent = (NoticeContent.GroupMemberIncrease | NoticeContent.GroupMemberDecrease | NoticeContent.GroupMemberBan | NoticeContent.GroupMemberUnban | NoticeContent.GroupAdminSet | NoticeContent.GroupAdminUnset | NoticeContent.GroupMessageDelete | NoticeContent.PrivateMessageDelete | NoticeContent.FriendDecrease | NoticeContent.FriendIncrease) & { [prop: string]: any }

export namespace NoticeContent {
    /// 群成员增加
    export interface GroupMemberIncrease {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_member_increase",
    }
    /// 群成员减少
    export interface GroupMemberDecrease {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_member_decrease",
    }
    /// 群成员禁言
    export interface GroupMemberBan {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_member_ban"
    }
    /// 群成员解除禁言
    export interface GroupMemberUnban {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_member_unban"
    }
    /// 群管理员设置
    export interface GroupAdminSet {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_admin_set"
    }
    /// 群管理员取消设置
    export interface GroupAdminUnset {
        sub_type: string,
        group_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_admin_unset"
    }
    /// 群消息删除
    export interface GroupMessageDelete {
        sub_type: string,
        group_id: string,
        message_id: string,
        user_id: string,
        operator_id: string,
        detail_type: "group_message_delete"
    }
    /// 好友增加
    export interface FriendIncrease {
        sub_type: string,
        user_id: string,
        detail_type: "friend_increase"
    }
    /// 好友减少
    export interface FriendDecrease {
        sub_type: string,
        user_id: string,
        detail_type: "friend_decrease"
    }
    /// 私聊消息删除
    export interface PrivateMessageDelete {
        sub_type: string,
        message_id: string,
        user_id: string,
        detail_type: "private_message_delete"
    }
}