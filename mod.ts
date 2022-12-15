export * from './model/mod.ts'

import { Resp, Event, Action } from './model/mod.ts'
import { WebSocketClient, WebSocketClientConfig, WebSocketServer, WebSocketServerConfig } from './obc/mod.ts'
import { Logger } from './deps.ts'
import { ActionHandler, Connect } from './obc/base.ts'

export { Logger }

export interface AppConfig {
    basic: {
        onebot_version: string
        impl: string
    }
    ws?: WebSocketServerConfig[]
    wsr?: WebSocketClientConfig[]
}

export class App<R extends Resp = Resp, E extends Event = Event, A extends Action = Action> {
    private obcs: Connect<R, E, A>[] = []
    private abort_controller: AbortController | undefined
    private logger: Logger = new Logger('dnlibob')

    constructor(private action_handler: ActionHandler<A, R>, private connect_handler: () => void) {
    }
    public start(config: AppConfig) {
        this.logger.info(`${config.basic.impl} 的 OneBot Connect 服务启动中`)
        this.abort_controller = new AbortController()
        if (config.ws) {
            for (const item of config.ws) {
                const obc = new WebSocketServer({ ...config.basic, ...item }, this.action_handler, this.connect_handler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
        if (config.wsr) {
            for (const item of config.wsr) {
                const obc = new WebSocketClient({ ...config.basic, ...item }, this.action_handler, this.connect_handler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
    }
    public shutdown() {
        this.logger.info(`正在尝试关闭所有连接`)
        this.abort_controller && this.abort_controller.abort()
        this.obcs = []
    }
    public send(data: E): void {
        for (const obc of this.obcs) {
            obc.send(data)
        }
    }
}