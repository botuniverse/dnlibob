import { MetaContent } from './meta.ts'
import { MessageContent } from './message.ts'
import { NoticeContent } from './notice.ts'
import { ExtendedMap } from '../utils/value.ts'

/** Onebot 12 标准事件 */
export type StandardEvent = MessageEvent | NoticeEvent | MetaEvent

/** Onebot 12 消息事件 */
export type MessageEvent = BaseEvent<'message', MessageContent>

/** Onebot 12 通知事件 */
export type NoticeEvent = BaseEvent<'notice', NoticeContent>

/** Onebot 12 元事件 */
export type MetaEvent = BaseEvent<'meta', MetaContent>

/** OneBot Event 基类
 * - 持有所有 Event 共有字段，其余字段由 Content 定义
 * - *事件* 是由 OneBot 实现自发产生或从机器人平台获得，由 OneBot 实现向应用端推送的数据
 */
export type BaseEvent<T extends 'meta' | 'message' | 'notice' | 'request', C extends ExtendedMap> = BaseEventInterface<T> & C

export interface BaseEventInterface<T extends string> {
    /** 事件唯一标识符 */
    id: string
    /** OneBot 实现名称，格式 `[_a-z]+` */
    impl: string
    /** OneBot 实现平台名称，格式 `[_a-z]+` */
    platform: string
    /** 机器人自身 ID */
    self_id: string
    /** 事件发生时间 */
    time: number
    /** 事件类型，必须是 `meta`、`message`、`notice`、`request` 中的一个，分别表示元事件、消息事件、通知事件和请求事件 */
    type: T
}

export type EventContent = MetaContent | MessageContent | NoticeContent