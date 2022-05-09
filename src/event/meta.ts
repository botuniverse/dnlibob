import { StatusContent } from "../resp.ts"

export type MetaContent = MetaContent.Heartbeat | MetaContent.Extended

export namespace MetaContent {
    export interface Extended {
        detail_type: string
        sub_type: string,
        [prop: string]: any
    }
    export interface Heartbeat extends Extended {
        interval: number,
        status: StatusContent,
        sub_type: string,
        detail_type: "heartbeat"
    }
}