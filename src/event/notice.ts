import { ExtendedMap } from '../utils/value.ts'

/** OneBot 通知事件 Content
 * - 通知事件是机器人平台向机器人发送通知对应的事件，例如群成员变动等
 */
export type NoticeContent<D extends Record<'detail_type', any> = NoticeContent.GroupMemberIncrease | NoticeContent.GroupMemberDecrease | NoticeContent.GroupMemberBan | NoticeContent.GroupMemberUnban | NoticeContent.GroupAdminSet | NoticeContent.GroupAdminUnset | NoticeContent.GroupMessageDelete | NoticeContent.PrivateMessageDelete | NoticeContent.FriendDecrease | NoticeContent.FriendIncrease | NoticeContent.GuildMemberDecrease | NoticeContent.GuildMemberIncrease | NoticeContent.ChannelCreate | NoticeContent.ChannelDelete | NoticeContent.ChannelMessageDelete, K extends ExtendedMap = {}> = D & K

export namespace NoticeContent {

    /** 群组成员增加
     * - 其中 `sub_type` 为 `join` 表示申请加群通过，`invite` 表示被邀请进群
     */
    export type GuildMemberIncrease<K extends ExtendedMap = {}> = _BaseGuildMemberIncrease & K

    export interface _BaseGuildMemberIncrease {
        /** 群组 ID */
        guild_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `guild_member_increase` */
        detail_type: 'guild_member_increase'
        /** 必须为 `join`、`invite`、空字符串或扩展的子类型 */
        sub_type: string
        /** 用户 ID */
        user_id: string
    }

    /** 群组成员减少
     * - 其中 `sub_type` 为 `leave` 表示主动退出，`kick` 表示被踢出
     */
    export type GuildMemberDecrease<K extends ExtendedMap = {}> = _BaseGuildMemberDecrease & K

    export interface _BaseGuildMemberDecrease {
        /** 群组 ID */
        guild_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `guild_member_decrease` */
        detail_type: 'guild_member_decrease'
        /** 必须为 `leave`、`kick`、空字符串或扩展的子类型 */
        sub_type: string
        /** 用户 ID */
        user_id: string
    }

    /** 频道消息删除
     * - 其中 `sub_type` 为 `recall` 表示主动撤回，`delete` 表示被管理员删除
     */
    export type ChannelMessageDelete<K extends ExtendedMap = {}> = _BaseChannelMessageDelete & K

    export interface _BaseChannelMessageDelete {
        /** 群组 ID */
        guild_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `channel_message_delete` */
        detail_type: 'channel_message_delete'
        /** 必须为 `recall`、`delete`、空字符串或扩展的子类型 */
        sub_type: string
        /** 消息发送者 ID */
        user_id: string
        /** 频道 ID */
        channel_id: string
        /** 消息 ID */
        message_id: string
    }

    /** 频道新建 */
    export type ChannelCreate<K extends ExtendedMap = {}> = _BaseChannelCreate & K

    export interface _BaseChannelCreate {
        /** 群组 ID */
        guild_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `channel_create` */
        detail_type: 'channel_create'
        /** 频道 ID */
        channel_id: string
    }

    /** 频道删除 */
    export type ChannelDelete<K extends ExtendedMap = {}> = _BaseChannelDelete & K

    export interface _BaseChannelDelete {
        /** 群组 ID */
        guild_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `channel_delete` */
        detail_type: 'channel_delete'
        /** 频道 ID */
        channel_id: string
    }


    /** 群成员增加 
     * - 本事件应在群成员（包括机器人自身）申请加群通过、被邀请进群或其它方式进群时触发
     * - 其中 `sub_type` 为 `join` 表示申请加群通过，`invite` 表示被邀请进群
     */
    export type GroupMemberIncrease<K extends ExtendedMap = {}> = _BaseGroupMemberIncrease & K

    export interface _BaseGroupMemberIncrease {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `join`、`invite`、空字符串或扩展的子类型 */
        sub_type: string
        /** 必须为 `group_member_increase` */
        detail_type: 'group_member_increase'
    }

    /** 群成员减少
     * - 本事件应在群成员（包括机器人自身）主动退出、被踢出或其它方式退出时触发
     * - 其中 `sub_type` 为 `leave` 表示主动退出，`kick` 表示被踢出
     */
    export type GroupMemberDecrease<K extends ExtendedMap = {}> = _BaseGroupMemberDecrease & K

    export interface _BaseGroupMemberDecrease {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `leave`、`kick`、空字符串或扩展的子类型 */
        sub_type: string
        /** 必须为 `group_member_decrease` */
        detail_type: 'group_member_decrease'
    }

    /** 群成员禁言
     * - 本事件应在群成员（包括机器人自身）被禁言时触发
     */
    export type GroupMemberBan<K extends ExtendedMap = {}> = _BaseGroupMemberBan & K

    export interface _BaseGroupMemberBan {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `group_member_ban` */
        detail_type: 'group_member_ban'
    }

    /** 群成员解除禁言
     * - 本事件应在群成员（包括机器人自身）被解除禁言时触发
     */
    export type GroupMemberUnban<K extends ExtendedMap = {}> = _BaseGroupMemberUnban & K

    export interface _BaseGroupMemberUnban {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `group_member_unban` */
        detail_type: 'group_member_unban'
    }

    /** 群管理员设置
     * - 本事件应在群成员（包括机器人自身）被设置为管理员时触发
     */
    export type GroupAdminSet<K extends ExtendedMap = {}> = _BaseGroupAdminSet & K

    export interface _BaseGroupAdminSet {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `group_admin_set` */
        detail_type: 'group_admin_set'
    }

    /** 群管理员取消设置
     * - 本事件应在群成员（包括机器人自身）的管理员身份被取消时触发
     */
    export type GroupAdminUnset<K extends ExtendedMap = {}> = _BaseGroupAdminUnset & K

    export interface _BaseGroupAdminUnset {
        /** 群 ID */
        group_id: string
        /** 用户 ID */
        user_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `group_admin_unset` */
        detail_type: 'group_admin_unset'
    }

    /** 群消息删除
     * - 本事件应在群消息被撤回或被管理员删除时触发
     * - 其中 `sub_type` 为 `recall` 表示主动撤回，`delete` 表示被管理员删除
     */
    export type GroupMessageDelete<K extends ExtendedMap = {}> = _BaseGroupMessageDelete & K

    export interface _BaseGroupMessageDelete {
        /** 群 ID */
        group_id: string
        /** 操作者 ID */
        operator_id: string
        /** 必须为 `recall`、`delete`、空字符串或扩展的子类型 */
        sub_type: string
        /** 消息 ID */
        message_id: string
        /** 消息发送者 ID` */
        user_id: string
        /** 必须为 `group_message_delete` */
        detail_type: 'group_message_delete'
    }


    /** 好友增加
     * - 本事件应在好友或关注者增加时触发
     */
    export type FriendIncrease<K extends ExtendedMap = {}> = _BaseFriendIncrease & K

    export interface _BaseFriendIncrease {
        /** 用户 ID */
        user_id: string
        /** 必须为 `friend_increase` */
        detail_type: 'friend_increase'
    }

    /** 好友减少
     * - 本事件应在好友或关注者减少时触发
     */
    export type FriendDecrease<K extends ExtendedMap = {}> = _BaseFriendDecrease & K

    export interface _BaseFriendDecrease {
        /** 用户 ID */
        user_id: string
        /** 必须为 `friend_decrease` */
        detail_type: 'friend_decrease'
    }

    /** 私聊消息删除
     * - 本事件应在私聊消息被删除时触发
     */
    export type PrivateMessageDelete<K extends ExtendedMap = {}> = _BasePrivateMessageDelete & K

    export interface _BasePrivateMessageDelete {
        /** 消息 ID */
        message_id: string
        /** 消息发送者 ID */
        user_id: string
        /** 必须为 `private_message_delete` */
        detail_type: 'private_message_delete'
    }

}