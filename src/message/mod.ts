/** 在事件和动作参数中用于表示聊天消息的数据类型 */
export type Message = MessageSegment[]

export namespace Message {
    export function alt(content: Message, rule = MessageSegment._altRules): string {
        let alt: string = ""
        for (const seg of content) {
            alt = alt + rule[seg.type](seg.data as any)
        }
        return alt
    }
}

/** 消息段 */
export type MessageSegment<T extends keyof MessageSegment._Map = keyof MessageSegment._Map> = T extends infer U ? MessageSegment._Base<U & T> : any

export namespace MessageSegment {

    export interface _Base<T extends keyof _Map> {
        /** 消息段名称 */
        type: T
        /** 消息段参数 */
        data: _Map[T]
    }

    /** 纯文本 */
    export interface Text {
        /** 纯文本内容 */
        text: string
    }

    /** 提及（即 @） */
    export interface Mention {
        /** 提及的用户 ID */
        user_id: string
    }

    /** 提及所有人 */
    export interface MentionAll {
    }
    /** 图片 */
    export interface Image {
        /** 图片文件 ID */
        file_id: string
    }
    /** 语音 */
    export interface Voice {
        /** 语音文件 ID */
        file_id: string
    }
    /** 音频 */
    export interface Audio {
        /** 音频文件 ID */
        file_id: String
    }
    /** 视频 */
    export interface Video {
        /** 视频文件 ID */
        file_id: String
    }
    /** 文件 */
    export interface File {
        /** 文件 ID */
        file_id: String
    }
    /** 位置 */
    export interface Location {
        /** 纬度 */
        latitude: number
        /** 经度 */
        longitude: number
        /** 标题 */
        title: string
        /** 地址内容 */
        content: string
    }
    /** 回复 */
    export interface Reply {
        /** 回复的消息 ID */
        message_id: string
        /** 回复的消息发送者 ID，发送时可以不传入 */
        user_id: string
    }

    export interface _Map {
        text: MessageSegment.Text
        mention: MessageSegment.Mention
        mention_all: MessageSegment.MentionAll
        image: MessageSegment.Image
        voice: MessageSegment.Voice
        audio: MessageSegment.Audio
        video: MessageSegment.Video
        file: MessageSegment.File
        location: MessageSegment.Location
        reply: MessageSegment.Reply
    }

    export type _TransformRule<T extends keyof _Map = keyof _Map> = {
        [key in T]: (data?: _Map[key]) => string
    }

    export const _altRules: _TransformRule = {
        text: (content?: MessageSegment.Text) => content!.text,
        mention: (content?: MessageSegment.Mention) => `[提及:${content!.user_id}]`,
        mention_all: () => '[提及所有人]',
        image: () => `[图片]`,
        voice: () => `[语音]`,
        audio: () => `[音频]`,
        video: () => `[视频]`,
        file: () => `[文件]`,
        location: () => `[位置]`,
        reply: (content?: MessageSegment.Reply) => `[回复:${content!.message_id}]`
    }

}

