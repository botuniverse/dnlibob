import { Message } from "../message/index.ts"

export type MessageContent = {
    message_id: string,
    message: Message,
    alt_message: string,
    user_id: string,
    sub_type: string,
    [prop: string]: any,
} & MessageEventType

type MessageEventType = Private | Group

export namespace MessageEventType {
    export function Group(group_id: string): MessageEventType {
        return {
            group_id: group_id
        }
    }
    export function Private(): MessageEventType {
        return {}
    }
}

interface Private {
}

interface Group {
    group_id: string
}

export namespace MessageContent {
    export function new_group_message_content(
        message: Message,
        message_id: string,
        user_id: string,
        group_id: string,
    ): MessageContent {
        return {
            ty: MessageEventType.Group(group_id),
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            sub_type: "",
        }
    }
    export function new_private_message_content(
        message: Message,
        message_id: string,
        user_id: string,
    ): MessageContent {
        return {
            ty: MessageEventType.Private(),
            message_id,
            alt_message: Message.alt(message),
            message,
            user_id,
            sub_type: "",
        }
    }
}