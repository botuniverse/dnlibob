import { MetaContent } from "./meta.ts";
import { MessageContent } from "./message.ts";
import { NoticeContent } from "./notice.ts";

export type StandardEvent = BaseEvent<EventContent>;
export type MessageEvent = BaseEvent<MessageContent> & { type: "message" };
export type NoticeEvent = BaseEvent<NoticeContent> & { type: "notice" };
export type MetaEvent = BaseEvent<MetaContent> & { type: "meta" };
export type ExtendedEvent = BaseEvent<ExtendedContent> & { type: string };

export type BaseEvent<T> = {
    id: string,
    impl: string,
    platform: string,
    self_id: string,
    time: number,
} & T

export interface ExtendedContent {
    sub_type: string
    detail_type: string
    [prop: string]: any
}

export type EventContent = (MetaContent & { type: "meta" }) | (MessageContent & { type: "message" }) | (NoticeContent & { type: "notice" }) | (ExtendedContent & { type: string })