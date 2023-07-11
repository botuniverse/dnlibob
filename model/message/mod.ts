// deno-lint-ignore-file no-explicit-any
import * as MessageSegmentsDetail from './detail.ts'

export { MessageSegmentsDetail }

export interface MessageSegmentsMap {
    text: MessageSegmentsDetail.Text
    mention: MessageSegmentsDetail.Mention
    mention_all: MessageSegmentsDetail.MentionAll
    image: MessageSegmentsDetail.Image
    voice: MessageSegmentsDetail.Voice
    audio: MessageSegmentsDetail.Audio
    video: MessageSegmentsDetail.Video
    file: MessageSegmentsDetail.File
    location: MessageSegmentsDetail.Location
    reply: MessageSegmentsDetail.Reply
}

export type Messages<K extends keyof MessageSegmentsMap = keyof MessageSegmentsMap> = MessageSegmentsMap[K][] | MessageSegmentsMap[K] | string

export interface MessageSegmentBase {
    /** 消息段名称 */
    type: string
    /** 消息段参数 */
    data: Record<string, any>
}