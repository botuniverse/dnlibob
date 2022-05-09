export type Message = MessageSegment[];

export namespace Message {
    export function alt(content: Message): string {
        let alt: string = ""
        for (const seg of content) {
            alt = alt + MessageSegment.alt(seg)
        }
        return alt
    }
}

export type MessageSegment = BaseMessageSegment<"text", MessageSegment.Text> | BaseMessageSegment<"mention", MessageSegment.Mention> | BaseMessageSegment<"mention_all", MessageSegment.MentionAll> | BaseMessageSegment<"image", MessageSegment.Image> | BaseMessageSegment<"voice", MessageSegment.Voice> | BaseMessageSegment<"audio", MessageSegment.Audio> | BaseMessageSegment<"video", MessageSegment.Video> | BaseMessageSegment<"audio", MessageSegment.Audio> | BaseMessageSegment<"video", MessageSegment.Video> | BaseMessageSegment<"file", MessageSegment.File> | BaseMessageSegment<"location", MessageSegment.Location> | BaseMessageSegment<"reply", MessageSegment.Reply> | BaseMessageSegment<string, MessageSegment.Custom>

export interface BaseMessageSegment<T, E> {
    type: T,
    data: E
}

export namespace MessageSegment {
    export interface Text extends Custom {
        text: string,
    }
    export interface Mention extends Custom {
        user_id: string,
    }
    export interface MentionAll extends Custom {
    }
    export interface Image extends Custom {
        file_id: string,
    }
    export interface Voice extends Custom {
        file_id: string,
    }
    export interface Audio extends Custom {
        file_id: String,
    }
    export interface Video extends Custom {
        file_id: String,
    }
    export interface File extends Custom {
        file_id: String,
    }
    export interface Location extends Custom {
        latitude: number,
        longitude: number,
        title: string,
        content: string,
    }
    export interface Reply extends Custom {
        message_id: string,
        user_id: string,
    }
    export interface Custom {
        [prop: string]: any
    }
    export function alt(content: MessageSegment): string {
        let data = content.data
        let telegramRich = ['telegram.bot_command', 'telegram.url', 'telegram.bold', 'telegram.cashtag', "telegram.italic", "telegram.underline", "telegram.strikethrough", 'telegram.email', "telegram.phone_number", "telegram.spoiler", "telegram.code"]
        if (content.type === "text") {
            return content.data.text
        } else if (content.type === "mention") {
            return `[提及:${data.user_id}]`
        } else if (content.type === "mention_all") {
            return `[提及所有人]`
        } else if (content.type === "image") {
            return `[图片]`
        } else if (content.type === "voice") {
            return "[语音]"
        } else if (content.type === "audio") {
            return "[音频]"
        } else if (content.type === "video") {
            return "[视频]"
        } else if (content.type === "file") {
            return "[文件]"
        } else if (content.type === "location") {
            return `[位置]`
        } else if (content.type === "reply") {
            return `[回复:${data.message_id}]`
        } else if (content.type === "telegram.text_link") {
            return content.data.text
        } else if (telegramRich.includes(content.type)) {
            return content.data.text
        }
        return `[${content.type}]`
    }
}

