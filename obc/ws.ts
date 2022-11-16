import { unpack, pack, serve } from '../deps.ts'
import { AppConfig } from '../mod.ts'
import { ActionHandler } from './mod.ts'

export interface WebSocketClientConfig {
    url: string
    access_token?: string
    reconnect_interval: number
    send_msgpack: boolean
}

export class WebSocketClient<R, E, A> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'

    constructor(private config: WebSocketClientConfig & AppConfig['basic'], private action_handler: ActionHandler<A, R>, private connect_handler: () => void) {
    }
    private connect(url: string, reconnect_interval: number) {
        this.ws = new WebSocket(url, `${this.config.onebot_version}.${this.config.impl}`)
        this.ws.addEventListener('close', () => {
            setTimeout(() => {
                this.status !== 'shutdown' && this.connect(url, reconnect_interval)
            }, reconnect_interval)
        })
        this.ws.addEventListener('open', () => {
            this.connect_handler()
        })
        this.ws.addEventListener('message', async (e) => {
            if (typeof e.data === 'string') {
                const resp = await this.action_handler(JSON.parse(e.data), this.config.send_msgpack)
                this.send(resp, this.config.send_msgpack)
            } else {
                const resp = await this.action_handler(unpack(e.data)!, true)
                this.send(resp, true)
            }
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
    public send(data: R | E, send_msgpack: boolean = this.config.send_msgpack): void {
        if (this.status === 'started' && this.ws && this.ws.readyState === this.ws.OPEN) {
            if (send_msgpack) {
                this.ws.send(pack(data))
            } else {
                this.ws.send(JSON.stringify(data))
            }
        }
    }
}

export interface WebSocketServerConfig {
    host: string
    port: number
    access_token?: string
    send_msgpack: boolean
}

export class WebSocketServer<R, E, A> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'

    constructor(private config: WebSocketServerConfig & AppConfig['basic'], private action_handler: ActionHandler<A, R>, private connect_handler: () => void) {
    }
    public start(signal: AbortSignal): void {
        this.status = 'started'
        signal.addEventListener('abort', () => {
            this.shutdown()
        })
        serve((req) => {
            let response, socket: WebSocket
            try {
                ({ response, socket } = Deno.upgradeWebSocket(req))
            } catch {
                //console.log(e)
                return new Response("request isn't trying to upgrade to websocket.")
            }
            socket.addEventListener('open', () => {
                this.ws = socket
                this.ws.addEventListener('message', async (e) => {
                    if (typeof e.data === 'string') {
                        const resp = await this.action_handler(JSON.parse(e.data), this.config.send_msgpack)
                        this.send(resp, this.config.send_msgpack)
                    } else {
                        const resp = await this.action_handler(unpack(e.data)!, true)
                        this.send(resp, true)
                    }
                })
                this.connect_handler()
            })
            return response
        }, { hostname: this.config.host, port: this.config.port, signal: signal })
    }
    public shutdown(): void {
        this.status = 'shutdown'
        this.ws && this.ws.close()
    }
    public send(data: R | E, send_msgpack: boolean = this.config.send_msgpack): void {
        if (this.status === 'started' && this.ws && this.ws.readyState === this.ws.OPEN) {
            if (send_msgpack) {
                this.ws.send(pack(data))
            } else {
                this.ws.send(JSON.stringify(data))
            }
        }
    }
}