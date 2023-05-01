export * from './model/mod.ts'

import { Resp, Event, Action } from './model/mod.ts'
import { WebSocketClient, WebSocketClientConfig, WebSocketServer, WebSocketServerConfig } from './obc/mod.ts'
import { Logger } from './deps.ts'
import { ActionHandler, Connect, ConnectedHandler } from './obc/share.ts'

export { Logger }

export interface AppConfig<R extends Resp = Resp, A extends Action = Action> {
    info: {
        onebot_version: string
        impl: string
        platform: string
        user_id: string
    }
    connect: {
        websocket?: WebSocketServerConfig[]
        websocket_reverse?: WebSocketClientConfig[]
    }
    action_handler: ActionHandler<A, R>
    connected_handler?: ConnectedHandler
}

export class App<R extends Resp = Resp, E extends Event = Event, A extends Action = Action> {
    private obcs: Map<string, Connect<R, E, A, unknown>> = new Map()
    private abort_controller: AbortController | undefined
    public logger: Logger
    private platform: string
    private user_id: string

    constructor(private config: AppConfig<R, A>) {
        this.platform = config.info.platform
        this.user_id = config.info.user_id
        this.logger = new Logger(`${this.platform}:${this.user_id}`)
    }
    public start(): void {
        this.logger.info(`OneBot Connect 服务启动中`)
        let obc_id_total = 0
        this.abort_controller = new AbortController()
        if (this.config.connect.websocket) {
            for (const item of this.config.connect.websocket) {
                obc_id_total++
                const id = obc_id_total.toString()
                const obc = new WebSocketServer(item, this.config.action_handler, { connected_handler: this.config.connected_handler, id })
                obc.start(this.abort_controller.signal)
                this.obcs.set(id.toString(), obc)
                
            }
        }
        if (this.config.connect.websocket_reverse) {
            for (const item of this.config.connect.websocket_reverse) {
                obc_id_total++
                const id = obc_id_total.toString()
                const obc = new WebSocketClient({
                    ...item,
                    ...this.config.info
                }, this.config.action_handler, { connected_handler: this.config.connected_handler, id })
                obc.start(this.abort_controller.signal)
                this.obcs.set(id, obc)
            }
        }
    }
    public shutdown(): void {
        this.logger.info(`正在尝试关闭所有连接`)
        this.abort_controller && this.abort_controller.abort()
        this.obcs.clear()
    }
    public send(data: E, cid?: string): void {
        if (typeof cid !== 'undefined') {
            const obc_id = cid.split(':')[0]
            this.obcs.get(obc_id)?.send(data, { cid })
            return
        }
        for (const obc of this.obcs) {
            obc[1].send(data)
        }
    }
    public changeUserID(id: string): void {
        this.user_id = id
        this.logger = new Logger(`${this.platform}:${this.user_id}`)
    }
}