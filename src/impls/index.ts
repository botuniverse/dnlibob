import { ImplConfig } from "../config.ts"
import { Rpc } from "../rpc.ts"
import { Logger } from "../utils/logger.ts"
import { ActionHandler } from "../handle/index.ts"
import { MetaEvent, StandardEvent, BaseEvent, EventContent } from "../event/index.ts"
import { StandardAction } from "../action.ts"
import { Resps, StatusContent } from "../resp.ts"

export namespace CustomOneBot {
    export interface Config<E, A, R> {
        impl: string,
        platform: string,
        self_id: string,
        config: ImplConfig,
        action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>
    }
}

const logger = new Logger("Teyda_libonebot")

/// OneBot Implementation 实例
///
/// E: Event 可以参考 src/event/index.ts
/// A: Action 可以参考 src/action.ts
/// R: ActionResp 可以参考 src/resp.ts
export class CustomOneBot<E, A, R> {
    #rpc: Rpc<E, A, R> | null = null
    public impl: string
    public platform: string
    public self_id: string
    public config: ImplConfig
    private running: boolean = false
    private online: boolean = false
    public action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>
    public onebot_version: string = "12"
    private heartbeating: boolean = false
    constructor(config: CustomOneBot.Config<E, A, R>) {
        this.impl = config.impl
        this.platform = config.platform
        this.self_id = config.self_id
        this.config = config.config
        this.action_handler = config.action_handler
    }
    run(): void {
        logger.info(`[${Logger.yellow(this.platform)}:${Logger.blue(this.self_id)}] ${this.impl} 之 Onebot 12 实现正在启动`)
        this.#rpc = new Rpc<E, A, R>(this.action_handler, this)
        //this.#rpc.http(this.config.http)
        //this.#rpc.webhook(this.config.http_webhook)
        this.#rpc.ws(this.config.websocket)
        this.#rpc.wsr(this.config.websocket_rev)
        this.running = true
        if (this.config.heartbeat.enabled) {
            this.start_heartbeat()
        }
    }
    stop(): void {
        this.running = false
        if (typeof this.#rpc?.all.ws.length !== "undefined" && this.#rpc.all.ws.length > 0) { this.#rpc?.all.ws.close() }
        if (typeof this.#rpc?.all.wsr.length !== "undefined" && this.#rpc.all.wsr.length > 0) { this.#rpc.all.wsr.close() }
        this.#rpc = null
    }
    is_running(): boolean {
        return this.running
    }
    get_status(): StatusContent {
        return {
            good: this.online ? this.running : false,
            online: this.online
        }
    }
    set_online(online: boolean) {
        this.online = online
    }
    send_event(event: E): void {
        if (this.running) {
            //this.#rpc?.all.http.send(event)
            //this.#rpc?.all.webhook.send(event)
            if (typeof this.#rpc?.all.ws.length !== "undefined" && this.#rpc.all.ws.length > 0) { this.#rpc?.all.ws.send(event) }
            if (typeof this.#rpc?.all.wsr.length !== "undefined" && this.#rpc.all.wsr.length > 0) { this.#rpc.all.wsr.send(event) }
        }
    }
    stop_heartbeat(): void {
        this.heartbeating = false
    }
    start_heartbeat(): void {
        this.heartbeating = true
        let interval = setInterval(() => {
            if (this.running && this.heartbeating) {
                let data = this.build_heartbeat(this.config.heartbeat.interval)
                this.send_event(data as any)
            } else {
                clearInterval(interval)
            }
        }, this.config.heartbeat.interval * 1000)
    }
    build_heartbeat(interval: number): MetaEvent {
        return {
            id: crypto.randomUUID(),
            impl: this.impl,
            platform: this.platform,
            self_id: this.self_id,
            time: new Date().getTime(),
            interval,
            status: this.get_status(),
            sub_type: "",
            detail_type: "heartbeat",
            type: "meta"
        }
    }
    new_event<H extends EventContent>(content: H, time: number): BaseEvent<H> {
        return {
            id: crypto.randomUUID(),
            impl: this.impl,
            platform: this.platform,
            self_id: this.self_id,
            time,
            ...content
        }
    }
}

export class OneBot extends CustomOneBot<StandardEvent, StandardAction, Resps>{

}