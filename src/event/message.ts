import { Message } from '../message/mod.ts'
import { ExtendedMap } from '../utils/value.ts'

/** OneBot 消息事件 Content
 * - 消息事件是聊天机器人收到其他用户发送的消息对应的一类事件，例如私聊消息等
 * - 对于 `user_id` 字段，如果存在匿名用户或群内系统自身发送的消息，应指定为固定值并在文档中告知用户
 */
export type MessageContent<D extends Record<'detail_type', any> = MessageEventDetail.Private | MessageEventDetail.Group | MessageEventDetail.Channel, K extends ExtendedMap = {}> = D & _BaseMessageContent & K

export interface _BaseMessageContent {
    /** 消息唯一 ID */
    message_id: string
    /** 消息内容 */
    message: Message
    /** 消息内容的替代表示, 可以为空 */
    alt_message: string
    /** 用户 ID */
    user_id: string
}

export namespace MessageEventDetail {

    /** 私聊消息 */
    export type Private<K extends ExtendedMap = {}> = BasePrivate & K

    export interface BasePrivate {
        /** 必须为 `private` */
        detail_type: 'private'
    }


    /** 群消息 */
    export type Group<K extends ExtendedMap = {}> = BaseGroup & K

    export interface BaseGroup {
        /** 必须为 `group` */
        detail_type: 'group'
        /** 群 ID */
        group_id: string
    }


    /** 频道消息 */
    export type Channel<K extends ExtendedMap = {}> = BaseChannel & K

    export interface BaseChannel {
        /** 必须为 `channel` */
        detail_type: 'channel'
        /** 群组 ID */
        guild_id: string
        /** 频道 ID */
        channel_id: string
    }

    export function new_channel_message_content(
        message: Message,
        message_id: string,
        user_id: string,
        guild_id: string,
        channel_id: string
    ): MessageContent {
        return {
            guild_id,
            channel_id,
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            detail_type: 'channel',
        }
    }

    export function new_group_message_content(
        message: Message,
        message_id: string,
        user_id: string,
        group_id: string,
    ): MessageContent {
        return {
            group_id,
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            detail_type: 'group',
        }
    }

    export function new_private_message_content(
        message: Message,
        message_id: string,
        user_id: string,
    ): MessageContent {
        return {
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            detail_type: 'private',
        }
    }
}