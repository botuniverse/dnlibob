export * from './model/mod.ts'

import { Logger } from './deps.ts'
import { WebSocketClientConfig, WebSocketServerConfig, WebSocketClient, WebSocketServer } from './obc/mod.ts'
import { Resps, Events, Actions } from './model/mod.ts'
import { Awaitable } from './utils.ts'

export { Logger }

export interface AppConfig {
    basic: {
        onebotVersion: string
        impl: string
        platform: string
    }
    connect: (WebSocketClientConfig | WebSocketServerConfig)[]
    connectedHandler?: () => Awaitable<Events[]>
    actionHandler: (data: Actions, isMsgpack: boolean) => Awaitable<Resps>
}

export class App {
    private controller?: AbortController
    private obcs: Array<WebSocketClient | WebSocketServer> = []
    public info: AppConfig['basic']
    public connectedHandler?: AppConfig['connectedHandler']
    public actionHandler?: AppConfig['actionHandler']
    constructor(private config: AppConfig) {
        this.info = config.basic
        this.connectedHandler = config.connectedHandler
        this.actionHandler = config.actionHandler
    }
    start() {
        if (this.obcs.length > 0) return
        this.controller = new AbortController()
        for (const item of this.config.connect) {
            let obc
            switch (item.protocol) {
                case 'ws':
                    obc = new WebSocketServer(this, item)
                    break
                case 'ws-reverse':
                    obc = new WebSocketClient(this, item)
                    break
            }
            if (obc) {
                obc.start(this.controller.signal)
                this.obcs.push(obc)
            }
        }
    }
    shutdown() {
        if (this.controller) {
            this.controller.abort()
        }
        this.obcs = []
    }
    send(event: Events) {
        for (const obc of this.obcs) {
            obc.send(event)
        }
    }
}