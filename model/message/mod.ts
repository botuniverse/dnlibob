import * as MessageSegmentDetail from './detail.ts'

export { MessageSegmentDetail }

export interface MessageSegmentMap {
    text: MessageSegmentDetail.Text
    mention: MessageSegmentDetail.Mention
    mention_all: MessageSegmentDetail.MentionAll
    image: MessageSegmentDetail.Image
    voice: MessageSegmentDetail.Voice
    audio: MessageSegmentDetail.Audio
    video: MessageSegmentDetail.Video
    file: MessageSegmentDetail.File
    location: MessageSegmentDetail.Location
    reply: MessageSegmentDetail.Reply
}

export type Message<K extends keyof MessageSegmentMap = keyof MessageSegmentMap> = MessageSegmentMap[K][]

export interface MessageSegmentBase {
    /** 消息段名称 */
    type: string
    /** 消息段参数 */
    data: Record<string, unknown>
}