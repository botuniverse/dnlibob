import { MetaContent } from "./meta.ts";
import { MessageContent } from "./message.ts";
import { NoticeContent } from "./notice.ts";
import { RequestContent } from "./request.ts";

export type StandardEvent = BaseEvent<EventContent>;
export type MessageEvent = BaseEvent<MessageContent>;
export type NoticeEvent = BaseEvent<NoticeContent>;
export type RequestEvent = BaseEvent<RequestContent>;
export type MetaEvent = BaseEvent<MetaContent>;

export type BaseEvent<T> = {
    id: string,
    impl: string,
    platform: string,
    self_id: string,
    time: number,
} & T

export type EventContent = MetaContent | MessageContent | NoticeContent | RequestContent