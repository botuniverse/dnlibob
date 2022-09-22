import * as MessageSegmentsDetail from './detail.ts'

export type MessageSegments = MessageSegmentsDetail.Text | MessageSegmentsDetail.Mention | MessageSegmentsDetail.MentionAll | MessageSegmentsDetail.Image | MessageSegmentsDetail.Voice | MessageSegmentsDetail.Audio | MessageSegmentsDetail.Video | MessageSegmentsDetail.File | MessageSegmentsDetail.Location | MessageSegmentsDetail.Reply

export { MessageSegmentsDetail }

export type Message<T extends MessageSegmentsDetail.MessageSegment = MessageSegments> = T[]