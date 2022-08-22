interface MessageSegment {
    type: string
    data: Record<string, unknown>
}

/** 纯文本 */
export interface Text extends MessageSegment {
    type: 'text'
    data: {
        /** 纯文本内容 */
        text: string
    }
}

/** 提及（即 @） */
export interface Mention extends MessageSegment {
    type: 'mention'
    data: {
        /** 提及的用户 ID */
        user_id: string
    }
}

/** 提及所有人 */
export interface MentionAll extends MessageSegment {
    type: 'mention_all'
    data: Record<never, never>
}

/** 图片 */
export interface Image extends MessageSegment {
    type: 'image'
    data: {
        /** 图片文件 ID */
        file_id: string
    }
}

/** 语音 */
export interface Voice extends MessageSegment {
    type: 'voice'
    data: {
        /** 语音文件 ID */
        file_id: string
    }
}

/** 音频 */
export interface Audio extends MessageSegment {
    type: 'Audio'
    data: {
        /** 音频文件 ID */
        file_id: string
    }
}

/** 视频 */
export interface Video extends MessageSegment {
    type: 'video'
    data: {
        /** 视频文件 ID */
        file_id: string
    }
}

/** 文件 */
export interface File extends MessageSegment {
    type: 'file'
    data: {
        /** 文件 ID */
        file_id: string
    }
}

/** 位置 */
export interface Location extends MessageSegment {
    type: 'location'
    data: {
        /** 纬度 */
        latitude: number
        /** 经度 */
        longitude: number
        /** 标题 */
        title: string
        /** 地址内容 */
        content: string
    }
}

/** 回复 */
export interface Reply extends MessageSegment {
    type: 'reply'
    data: {
        /** 回复的消息 ID */
        message_id: string
        /** 回复的消息发送者 ID，发送时可以不传入 */
        user_id: string
    }
}