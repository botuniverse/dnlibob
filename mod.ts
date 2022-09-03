export * from './model/mod.ts'

import { AllResps } from './model/mod.ts'
import { WebSocketClient, WebSocketClientConfig, WebSocketServer, WebSocketServerConfig } from './obc/mod.ts'
import { Logger } from './deps.ts'

export interface OneBotConfig {
    basic: {
        onebot_version: 12
        impl: string
    }
    ws?: WebSocketClientConfig[]
    wsr?: WebSocketServerConfig[]
}

export class OneBot<R = AllResps> {
    private obcs: (WebSocketClient<R> | WebSocketServer<R>)[] = []
    private abort_controller: AbortController | undefined
    private logger: Logger = new Logger('dnlibob')

    constructor(private action_hanler: (data: unknown) => R) {
    }
    start(config: OneBotConfig) {
        this.logger.info(`${config.basic.impl}正在启动中`)
        this.abort_controller = new AbortController()
        if (config.ws) {
            for (const item of config.ws) {
                const obc = new WebSocketClient({ ...config.basic, ...item }, this.action_hanler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
        if (config.wsr) {
            for (const item of config.wsr) {
                const obc = new WebSocketServer({ ...config.basic, ...item }, this.action_hanler)
                obc.start(this.abort_controller.signal)
                this.obcs.push(obc)
            }
        }
    }
    shutdown() {
        this.logger.info(`正在尝试关闭所有连接`)
        this.abort_controller && this.abort_controller.abort()
        this.obcs = []
    }
    send(data: string | ArrayBuffer) {
        for (const obc of this.obcs) {
            obc.send(data)
        }
    }
}