// deno-lint-ignore-file no-empty-interface
export interface Text {
    /** 纯文本内容 */
    text: string
}

export interface Mention {
    /** 提及的用户 ID */
    user_id: string
}

export interface MentionAll {
}

export interface Image {
    /** 图片文件 ID */
    file_id: string
}

export interface Voice {
    /** 语音文件 ID */
    file_id: string
}

export interface Audio {
    /** 音频文件 ID */
    file_id: string
}

export interface Video {
    /** 视频文件 ID */
    file_id: string
}

export interface File {
    /** 文件 ID */
    file_id: string
}

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

export interface Reply {
    /** 回复的消息 ID */
    message_id: string
    /** 回复的消息发送者 ID，发送时可以不传入 */
    user_id: string
}