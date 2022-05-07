export type Message = MessageSegment[];

export namespace Message {
    export function alt(content: Message): string {
        let alt = ""
        for (const seg of content) {
            alt + MessageSegment.alt(seg)
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
        switch (content.type) {
            case "text":
                {
                    let { text } = content.data
                    return text
                }
            case "mention":
                {
                    let { user_id } = content.data
                    return `[Mention=${user_id}]`
                }
            case "mention_all":
                return "[MentionAll]"
            case "image":
                {
                    let { file_id } = content.data
                    return `[Image,file_id=${file_id}]`
                }
            case "voice":
                return "[Voice]"
            case "audio":
                return "[Audio]"
            case "video":
                return "[Video]"
            case "file":
                return "[File]"
            case "location":
                return "[Location]"
            case "reply":
                {
                    let { user_id } = content.data
                    return `[Reply=${user_id}]`
                }
            default:
                {
                    return `[${content.type}]`
                }
        }
    }
}

