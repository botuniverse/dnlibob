import { StatusContent } from "../resp.ts"

export type MetaContent = (MetaContent.Heartbeat) & { [prop: string]: any }

export namespace MetaContent {
    export interface Heartbeat {
        interval: number,
        status: StatusContent,
        sub_type: string,
        detail_type: "heartbeat"
    }
}