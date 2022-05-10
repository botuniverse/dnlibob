export type Message = MessageSegment[] | TelegramMessageSegment[];

export namespace Message {
    export function alt(content: Message): string {
        let alt: string = ""
        for (const seg of content) {
            alt = alt + MessageSegment.alt(seg)
        }
        return alt
    }
}

export type MessageSegment = BaseMessageSegment<"text", MessageSegment.Text> | BaseMessageSegment<"mention", MessageSegment.Mention> | BaseMessageSegment<"mention_all", MessageSegment.MentionAll> | BaseMessageSegment<"image", MessageSegment.Image> | BaseMessageSegment<"voice", MessageSegment.Voice> | BaseMessageSegment<"audio", MessageSegment.Audio> | BaseMessageSegment<"video", MessageSegment.Video> | BaseMessageSegment<"audio", MessageSegment.Audio> | BaseMessageSegment<"video", MessageSegment.Video> | BaseMessageSegment<"file", MessageSegment.File> | BaseMessageSegment<"location", MessageSegment.Location> | BaseMessageSegment<"reply", MessageSegment.Reply>

export interface BaseMessageSegment<T, E> {
    type: T,
    data: E
}

export type TelegramMessageSegment = BaseMessageSegment<"mention", ExtendMessageSegment.Mention> | BaseMessageSegment<'telegram.bot_command' | 'telegram.url' | 'telegram.bold' | 'telegram.cashtag' | "telegram.italic" | "telegram.underline" | "telegram.strikethrough" | 'telegram.email' | "telegram.phone_number" | "telegram.spoiler" | "telegram.code", ExtendMessageSegment.RichText> | BaseMessageSegment<"telegram.text_mention", ExtendMessageSegment.TextMention> | BaseMessageSegment<"telegram.text_link", ExtendMessageSegment.TextLink> | MessageSegment

export namespace ExtendMessageSegment {
    export interface Mention {
        user_id: "",
        'telegram.text': string
    }
    export interface RichText {
        text: string
    }
    export interface TextMention {
        user_id: string
        text: string
    }
    export interface TextLink {
        text: string
        url: string
    }
}

export namespace MessageSegment {
    export interface Text {
        text: string,
        [prop: string]: any
    }
    export interface Mention {
        user_id: string,
        [prop: string]: any
    }
    export interface MentionAll {
        [prop: string]: any
    }
    export interface Image {
        file_id: string,
        [prop: string]: any
    }
    export interface Voice {
        file_id: string,
        [prop: string]: any
    }
    export interface Audio {
        file_id: String,
        [prop: string]: any
    }
    export interface Video {
        file_id: String,
        [prop: string]: any
    }
    export interface File {
        file_id: String,
        [prop: string]: any
    }
    export interface Location {
        latitude: number,
        longitude: number,
        title: string,
        content: string,
        [prop: string]: any
    }
    export interface Reply {
        message_id: string,
        user_id: string,
        [prop: string]: any
    }
    export function alt(content: MessageSegment | TelegramMessageSegment): string {
        let telegramRich = ['telegram.bot_command', 'telegram.url', 'telegram.bold', 'telegram.cashtag', "telegram.italic", "telegram.underline", "telegram.strikethrough", 'telegram.email', "telegram.phone_number", "telegram.spoiler", "telegram.code"]
        if (content.type === "text") {
            return content.data.text
        } else if (content.type === "mention") {
            return `[提及:${content.data.user_id}]`
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
            return `[回复:${content.data.message_id}]`
        } else if (content.type === "telegram.text_link") {
            return content.data.text
        } else if (telegramRich.includes(content.type)) {
            return content.data.text
        } else if (content.type === 'telegram.text_mention') {
            return `[文本提及:${content.data.user_id}]`
        }
        return `[${content.type}]`
    }
}

