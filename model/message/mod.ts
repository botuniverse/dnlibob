import * as TM from './types.ts'

export type MessageSegments = TM.Text | TM.Mention | TM.MentionAll | TM.Image | TM.Voice | TM.Audio | TM.Video | TM.File | TM.Location | TM.Reply

export type Message = MessageSegments[]