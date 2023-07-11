export * from './model/mod.ts'

import { Logger } from './deps.ts'
import { WebSocketClientConfig, WebSocketServerConfig, WebSocketClient, WebSocketServer } from './obc/mod.ts'
import { RespBase, Resps, EventBase, Events, ActionBase, Actions } from './model/mod.ts'

export { Logger }

export interface AppConfig<E extends EventBase, A extends ActionBase, R extends RespBase> {
    info: {
        onebotVersion: string
        impl: string
        platform: string
    }
    connect: (WebSocketClientConfig | WebSocketServerConfig)[]
    connectedHandler?: () => Promise<E[]> | E[]
    actionHandler: (data: A) => Promise<R> | R
}

export class App<E extends EventBase = Events, A extends ActionBase = Actions, R extends RespBase = Resps> {
    private controller?: AbortController
    private obcs: Array<WebSocketClient<E, A, R> | WebSocketServer<E, A, R>> = []
    public info: AppConfig<E, A, R>['info']
    public connectedHandler?: AppConfig<E, A, R>['connectedHandler']
    public actionHandler?: AppConfig<E, A, R>['actionHandler']
    constructor(private config: AppConfig<E, A, R>) {
        this.info = config.info
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
    send(event:E) {
        for (const obc of this.obcs){
            obc.send(event)
        }
    }
}