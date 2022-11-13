import * as MessageSegmentsDetail from './detail.ts'

export { MessageSegmentsDetail }

export interface MessageSegmentMap {
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

export type Message<K extends keyof MessageSegmentMap = keyof MessageSegmentMap> = MessageSegmentMap[K][]