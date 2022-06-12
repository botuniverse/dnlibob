import { RespContent } from '../resp.ts'
import { ExtendedMap } from '../utils/value.ts'

/** OneBot 元事件 Content
 * - 元事件是 OneBot 实现内部自发产生的一类事件，例如心跳等。
 * - 与 OneBot 本身的运行状态有关，与实现对应的机器人平台无关
 */
export type MetaContent<D extends Record<'detail_type', any> = MetaContent.Heartbeat, K extends ExtendedMap = {}> = D & K

export namespace MetaContent {

    /** 心跳 */
    export type Heartbeat<E extends ExtendedMap = {}> = _BaseHeartbeat & E

    export interface _BaseHeartbeat {
        /** 到下次心跳的间隔，单位：毫秒 */
        interval: number
        /** OneBot 状态，与 `get_status` 动作响应数据一致 */
        status: RespContent.GetStatus
        /** 必须为 `heartbeat` */
        detail_type: 'heartbeat'
    }

}