import { StatusContent } from "../resp.ts"

export type MetaContent =  MetaContent.Heartbeat

export namespace MetaContent {
    export interface Heartbeat {
        interval: number,
        status: StatusContent,
        sub_type: string,
        detail_type: "heartbeat"
    }
}