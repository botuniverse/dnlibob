export * from './model/mod.ts'

import { AllResps, AllEvents, Action } from './model/mod.ts'
import { WebSocketClient, WebSocketClientConfig, WebSocketServer, WebSocketServerConfig } from './obc/mod.ts'
import { Logger } from './deps.ts'

export { Logger }

export interface OneBotConfig {
    basic: {
        onebot_version: 12
        impl: string
    }
    ws?: WebSocketServerConfig[]
    wsr?: WebSocketClientConfig[]
}

export type ActionHandler<A, R> = (data: A, send_msgpack: boolean) => Promise<R>

export class OneBot<R extends AllResps = AllResps, E extends AllEvents = AllEvents, A extends Action = Action> {
    private obcs: (WebSocketClient<R, E, A> | WebSocketServer<R, E, A>)[] = []
    private abort_controller: AbortController | undefined
    private logger: Logger = new Logger('dnlibob')

    constructor(private action_hanler: ActionHandler<A, R>) {
    }
    public start(config: OneBotConfig) {
        this.logger.info(`${config.basic.impl}正在启动中`)
        this.abort_controller = new AbortController()
        if (config.ws) {
            for (const item of config.ws) {
                const obc = new WebSocketServer({ ...config.basic, ...item }, this.action_hanler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
        if (config.wsr) {
            for (const item of config.wsr) {
                const obc = new WebSocketClient({ ...config.basic, ...item }, this.action_hanler)
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