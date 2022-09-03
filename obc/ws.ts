import { msgpack, serve } from '../deps.ts'
import { OneBotConfig } from '../mod.ts'

export interface WebSocketClientConfig {
    url: string
    access_token?: string
    reconnect_interval: number
}

export class WebSocketClient<R> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'

    constructor(private config: WebSocketClientConfig & OneBotConfig['basic'], private handler: (data: unknown) => R) {
    }
    private connect(url: string, reconnect_interval: number) {
        this.ws = new WebSocket(url, `${this.config.onebot_version}.${this.config.impl}`)
        this.ws.addEventListener('close', () => {
            setTimeout(() => {
                this.status !== 'shutdown' && this.connect(url, reconnect_interval)
            }, reconnect_interval)
        })
        this.ws.addEventListener('message', (e) => {
            let data = {}
            if (typeof e.data === 'string') {
                data = JSON.parse(e.data)
            } else {
                data = msgpack.decode(e.data)!
            }
            this.handler(data)
        })
    }
    public start(signal: AbortSignal): void {
        this.status = 'started'
        signal.addEventListener('abort', () => {
            this.shutdown()
        })
        let suffix = ''
        this.config.access_token && (suffix = `/?access_token=${this.config.access_token}`)
        this.connect(`${this.config.url}${suffix}`, this.config.reconnect_interval)
    }
    public shutdown(): void {
        this.status = 'shutdown'
        this.ws && this.ws.close()
    }
    public send(data: string | ArrayBuffer): void {
        if (this.status === 'started' && this.ws && this.ws.readyState === this.ws.OPEN) {
            this.ws.send(data)
        }
    }
}

export interface WebSocketServerConfig {
    host: string
    port: number
    access_token?: string
}

export class WebSocketServer<R> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'

    constructor(private config: WebSocketServerConfig & OneBotConfig['basic'], private handler: (data: unknown) => R) {
    }
    public start(signal: AbortSignal): void {
        this.status = 'started'
        signal.addEventListener('abort', () => {
            this.shutdown()
        })
        serve((req) => {
            let response, socket: WebSocket
            try {
                ({ response, socket } = Deno.upgradeWebSocket(req));
            } catch {
                return new Response("request isn't trying to upgrade to websocket.")
            }
            socket.addEventListener('open', () => {
                this.ws = socket
                this.ws.addEventListener('message', (e) => {
                    let data = {}
                    if (typeof e.data === 'string') {
                        data = JSON.parse(e.data)
                    } else {
                        data = msgpack.decode(e.data)!
                    }
                    this.handler(data)
                })
            })
            return response
        }, { hostname: this.config.host, port: this.config.port })
    }
    public shutdown(): void {
        this.status = 'shutdown'
        this.ws && this.ws.close()
    }
    public send(data: string | ArrayBuffer): void {
        if (this.status === 'started' && this.ws && this.ws.readyState === this.ws.OPEN) {
            this.ws.send(data)
        }
    }
}