export type Message = [MessageSegment];

export namespace Message {
    export function alt(content: Message): string {
        let alt = ""
        for (const seg of content) {
            alt + MessageSegment.alt(seg)
        }
        return alt
    }
}

export type MessageSegment = MessageSegment.Text | MessageSegment.Mention | MessageSegment.MentionAll | MessageSegment.Image | MessageSegment.Voice | MessageSegment.Audio | MessageSegment.Video | MessageSegment.File | MessageSegment.Location | MessageSegment.Reply | MessageSegment.Custom

export enum MessageSegmentEnum {
    Text,
    Mention,
    MentionAll,
    Image,
    Voice,
    Audio,
    Video,
    File,
    Location,
    Reply,
    Custom
}

export namespace MessageSegment {
    export interface Text {
        text: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Text
    }
    export interface Mention {
        user_id: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Mention
    }
    export interface MentionAll {
        extend: Record<string, any>,
        _t: MessageSegmentEnum.MentionAll
    }
    export interface Image {
        file_id: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Image
    }
    export interface Voice {
        file_id: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Voice
    }
    export interface Audio {
        file_id: String,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Audio
    }
    export interface Video {
        file_id: String,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Video
    }
    export interface File {
        file_id: String,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.File
    }
    export interface Location {
        latitude: number,
        longitude: number,
        title: string,
        content: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Location
    }
    export interface Reply {
        message_id: string,
        user_id: string,
        extend: Record<string, any>,
        _t: MessageSegmentEnum.Reply
    }
    export interface Custom {
        ty: string,
        data: Record<string, any>,
        _t: MessageSegmentEnum.Custom
    }
    export function alt(content: MessageSegment): string {
        switch (content._t) {
            case MessageSegmentEnum.Text:
                {
                    let { text } = content
                    return text
                }
            case MessageSegmentEnum.Mention:
                {
                    let { user_id } = content
                    return `[Mention=${user_id}]`
                }
            case MessageSegmentEnum.MentionAll:
                return "[MentionAll]"
            case MessageSegmentEnum.Image:
                {
                    let { file_id } = content
                    return `[Image,file_id=${file_id}]`
                }
            case MessageSegmentEnum.Voice:
                return "[Voice]"
            case MessageSegmentEnum.Audio:
                return "[Audio]"
            case MessageSegmentEnum.Video:
                return "[Video]"
            case MessageSegmentEnum.File:
                return "[File]"
            case MessageSegmentEnum.Location:
                return "[Location]"
            case MessageSegmentEnum.Reply:
                {
                    let { user_id } = content
                    return `[Reply=${user_id}]`
                }
            case MessageSegmentEnum.Custom:
                {
                    let { ty } = content
                    return `[${ty}]`
                }
        }
    }
}

