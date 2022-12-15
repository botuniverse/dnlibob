import { unpack, pack, serve } from '../deps.ts'
import { AppConfig } from '../mod.ts'
import { ActionHandler, Connect } from './base.ts'

export interface WebSocketClientConfig {
    url: string
    access_token?: string
    reconnect_interval: number
    send_msgpack: boolean
}

export class WebSocketClient<R, E, A> extends Connect<R, E, A, WebSocketClientConfig & AppConfig['basic']> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'
    private can_send = false

    constructor(config: WebSocketClientConfig & AppConfig['basic'], action_handler: ActionHandler<A, R>, connect_handler: () => void) {
        super(config, action_handler, connect_handler)
    }
    private connect(url: string, reconnect_interval: number) {
        this.ws = new WebSocket(url, `${this.config.onebot_version}.${this.config.impl}`)
        this.ws.addEventListener('close', () => {
            this.can_send = false
            setTimeout(() => {
                this.status !== 'shutdown' && this.connect(url, reconnect_interval)
            }, reconnect_interval)
        })
        this.ws.addEventListener('open', () => {
            this.connect_handler()
            this.can_send = true
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
        if (this.status === 'started' && this.can_send) {
            if (send_msgpack) {
                this.ws!.send(pack(data))
            } else {
                this.ws!.send(JSON.stringify(data))
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

export class WebSocketServer<R, E, A> extends Connect<R, E, A, WebSocketServerConfig & AppConfig['basic']>  {
    public status: 'started' | 'shutdown' = 'shutdown'
    private connections: Map<number, { ws: WebSocket, can_send: boolean }> = new Map()
    private id = 0

    constructor(config: WebSocketServerConfig & AppConfig['basic'], action_handler: ActionHandler<A, R>, connect_handler: () => void) {
        super(config, action_handler, connect_handler)
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
            const id = this.id
            this.connections.set(id, { ws: socket, can_send: false })
            this.id++
            socket.addEventListener('open', () => {
                this.connect_handler()
                this.connections.set(id, { ws: socket, can_send: true })
            })
            socket.addEventListener('message', async (e) => {
                if (typeof e.data === 'string') {
                    const resp = await this.action_handler(JSON.parse(e.data), this.config.send_msgpack)
                    this.send(resp, this.config.send_msgpack)
                } else {
                    const resp = await this.action_handler(unpack(e.data)!, true)
                    this.send(resp, true)
                }
            })
            socket.addEventListener('close', () => {
                this.connections.delete(id)
            })
            return response
        }, { hostname: this.config.host, port: this.config.port, signal: signal })
    }
    public shutdown(): void {
        this.status = 'shutdown'
        for (const [, { ws }] of this.connections) {
            ws.close()
        }
    }
    public send(data: R | E, send_msgpack: boolean = this.config.send_msgpack): void {
        if (this.status === 'started') {
            const serialize = send_msgpack ? pack(data) : JSON.stringify(data)
            for (const [, { ws, can_send }] of this.connections) {
                if (!can_send) continue
                ws.send(serialize)
            }
        }
    }
}