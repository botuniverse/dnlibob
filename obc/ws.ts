import { unpack, pack, serve } from '../deps.ts'
import { ActionHandler, Connect, ConnectedHandler, ExtraConnectConfig } from './share.ts'

export interface WebSocketClientConfig {
    url: string
    access_token?: string
    reconnect_interval: number
    send_msgpack: boolean
}

export class WebSocketClient<R, E, A> extends Connect<R, E, A, WebSocketClientConfig & ExtraConnectConfig> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'
    private can_send = false

    constructor(config: WebSocketClientConfig & ExtraConnectConfig, action_handler: ActionHandler<A, R>, connected_handler: ConnectedHandler<E>) {
        super(config, action_handler, connected_handler)
    }
    private wsSend(ws: WebSocket, data: R | E, send_msgpack = this.config.send_msgpack) {
        if (send_msgpack) {
            ws.send(pack(data))
        } else {
            ws.send(JSON.stringify(data))
        }
    }
    private connect(url: string, reconnect_interval: number) {
        this.ws = new WebSocket(url, `${this.config.onebot_version}.${this.config.impl}`)
        this.ws.binaryType = 'arraybuffer'
        this.ws.addEventListener('close', () => {
            this.can_send = false
            setTimeout(() => {
                this.status !== 'shutdown' && this.connect(url, reconnect_interval)
            }, reconnect_interval)
        })
        this.ws.addEventListener('open', async () => {
            const data = await this.connected_handler()
            for (const event of data) {
                this.wsSend(this.ws!, event)
            }
            this.can_send = true
        })
        this.ws.addEventListener('message', async ({ data }) => {
            if (data instanceof ArrayBuffer) {
                const resp = await this.action_handler(unpack(new Uint8Array(data)), true)
                this.send(resp, true)
            } else {
                const resp = await this.action_handler(JSON.parse(data), this.config.send_msgpack)
                this.send(resp)
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
    public send(data: R | E, send_msgpack?: boolean): void {
        if (this.status === 'started' && this.can_send) {
            this.wsSend(this.ws!, data, send_msgpack)
        }
    }
}

export interface WebSocketServerConfig {
    host: string
    port: number
    access_token?: string
    send_msgpack: boolean
}

interface WSSConnectionsValue {
    ws: WebSocket
    can_send: boolean
}

export class WebSocketServer<R, E, A> extends Connect<R, E, A, WebSocketServerConfig>  {
    public status: 'started' | 'shutdown' = 'shutdown'
    private connections: Map<number, WSSConnectionsValue> = new Map()
    private id = 0

    constructor(config: WebSocketServerConfig, action_handler: ActionHandler<A, R>, connected_handler: ConnectedHandler<E>) {
        super(config, action_handler, connected_handler)
    }
    private wsSend<S, D extends S extends true ? ArrayBuffer | string : R | E>(ws: WebSocket, data: D, serialization?: S) {
        if (serialization) {
            ws.send(data as ArrayBuffer | string)
        } else {
            ws.send(this.serialize(data as R | E, this.config.send_msgpack))
        }
    }
    private serialize(data: R | E, send_msgpack: boolean): ArrayBuffer | string {
        return send_msgpack ? pack(data) : JSON.stringify(data)
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
            socket.binaryType = 'arraybuffer'
            const id = this.id
            this.connections.set(id, { ws: socket, can_send: false })
            this.id++
            socket.addEventListener('open', async () => {
                const data = await this.connected_handler()
                for (const event of data) {
                    this.wsSend(socket, event)
                }
                this.connections.set(id, { ws: socket, can_send: true })
            })
            socket.addEventListener('message', async ({ data }) => {
                if (data instanceof ArrayBuffer) {
                    const resp = await this.action_handler(unpack(new Uint8Array(data)), true)
                    this.send(resp, true)
                } else {
                    const resp = await this.action_handler(JSON.parse(data), this.config.send_msgpack)
                    this.send(resp)
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
    public send(data: R | E, send_msgpack = this.config.send_msgpack): void {
        if (this.status === 'started') {
            const serialization = this.serialize(data, send_msgpack)
            for (const [, { ws, can_send }] of this.connections) {
                if (!can_send) continue
                this.wsSend(ws, serialization, true)
            }
        }
    }
}