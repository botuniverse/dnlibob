export * from './model/mod.ts'

import { Resp, Event, Action } from './model/mod.ts'
import { WebSocketClient, WebSocketClientConfig, WebSocketServer, WebSocketServerConfig } from './obc/mod.ts'
import { Logger } from './deps.ts'
import { ActionHandler, Connect, ConnectedHandler } from './obc/share.ts'

export { Logger }

export interface AppConfig<R extends Resp = Resp, E extends Event = Event, A extends Action = Action> {
    basic: {
        onebot_version: string
        impl: string
        platform: string
        user_id: string
    }
    ws?: WebSocketServerConfig[]
    wsr?: WebSocketClientConfig[]
    action_handler: ActionHandler<A, R>
    connected_handler: ConnectedHandler<E>
}

export class App<R extends Resp = Resp, E extends Event = Event, A extends Action = Action> {
    private obcs: Connect<R, E, A, unknown>[] = []
    private abort_controller: AbortController | undefined
    public logger: Logger
    private platform: string
    private user_id: string

    constructor(private config: AppConfig<R, E, A>) {
        this.platform = config.basic.platform
        this.user_id = config.basic.user_id
        this.logger = new Logger(`${this.platform}:${this.user_id}`)
    }
    public start(): void {
        this.logger.info(`OneBot Connect 服务启动中`)
        this.abort_controller = new AbortController()
        if (this.config.ws) {
            for (const item of this.config.ws) {
                const obc = new WebSocketServer(item, this.config.action_handler, this.config.connected_handler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
        if (this.config.wsr) {
            for (const item of this.config.wsr) {
                const obc = new WebSocketClient({
                    onebot_version: this.config.basic.onebot_version,
                    impl: this.config.basic.impl,
                    ...item
                }, this.config.action_handler, this.config.connected_handler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
    }
    public shutdown(): void {
        this.logger.info(`正在尝试关闭所有连接`)
        this.abort_controller && this.abort_controller.abort()
        this.obcs = []
    }
    public send(data: E): void {
        for (const obc of this.obcs) {
            obc.send(data)
        }
    }
    public changeUserID(id: string): void {
        this.user_id = id
        this.logger = new Logger(`${this.platform}:${this.user_id}`)
    }
}