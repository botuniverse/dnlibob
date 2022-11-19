// deno-lint-ignore-file no-empty-interface
interface MessageSegment {
    type: string
    data: Record<never, never>
}

/** 纯文本 */
export interface Text extends MessageSegment {
    type: 'text'
    data: _TextData
}

export interface _TextData {
    /** 纯文本内容 */
    text: string
}

/** 提及（即 @） */
export interface Mention extends MessageSegment {
    type: 'mention'
    data: _MentionData
}

export interface _MentionData {
    /** 提及的用户 ID */
    user_id: string
}

/** 提及所有人 */
export interface MentionAll extends MessageSegment {
    type: 'mention_all'
    data: _MentionAllData
}

export interface _MentionAllData {
}

/** 图片 */
export interface Image extends MessageSegment {
    type: 'image'
    data: _ImageData
}

export interface _ImageData {
    /** 图片文件 ID */
    file_id: string
}

/** 语音 */
export interface Voice extends MessageSegment {
    type: 'voice'
    data: _VoiceData
}

export interface _VoiceData {
    /** 语音文件 ID */
    file_id: string
}

/** 音频 */
export interface Audio extends MessageSegment {
    type: 'audio'
    data: _AudioData
}

export interface _AudioData {
    /** 音频文件 ID */
    file_id: string
}

/** 视频 */
export interface Video extends MessageSegment {
    type: 'video'
    data: _VideoData
}

export interface _VideoData {
    /** 视频文件 ID */
    file_id: string
}

/** 文件 */
export interface File extends MessageSegment {
    type: 'file'
    data: _FileData
}

export interface _FileData {
    /** 文件 ID */
    file_id: string
}

/** 位置 */
export interface Location extends MessageSegment {
    type: 'location'
    data: _LocationData
}

export interface _LocationData {
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
export interface Reply extends MessageSegment {
    type: 'reply'
    data: _ReplyData
}

export interface _ReplyData {
    /** 回复的消息 ID */
    message_id: string
    /** 回复的消息发送者 ID，发送时可以不传入 */
    user_id: string
}