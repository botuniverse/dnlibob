import { Message } from "../message/index.ts"

export type MessageContent = {
    message_id: string,
    message: Message,
    alt_message: string,
    user_id: string,
    sub_type: string,
    [prop: string]: any,
} & MessageEventType

type MessageEventType = Private | Group | Extended

interface Private {
    detail_type: "private"
}

interface Group {
    detail_type: "group",
    group_id: string
}

interface Extended {
    detail_type: string
}

export namespace MessageContent {
    export function new_group_message_content(
        message: Message,
        message_id: string,
        user_id: string,
        group_id: string,
    ): MessageContent {
        return {
            group_id,
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            sub_type: "",
            detail_type: "group",
        }
    }
    export function new_private_message_content(
        message: Message,
        message_id: string,
        user_id: string,
    ): MessageContent {
        return {
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            sub_type: "",
            detail_type: "private",
        }
    }
}