import { unpack, pack, serve } from '../deps.ts'
import { ActionHandler, Connect, ConnectOptional } from './share.ts'
import { AppConfig } from '../mod.ts'

export interface WebSocketClientConfig {
    url: string
    access_token?: string
    reconnect_interval: number
    send_msgpack: boolean
}

export class WebSocketClient<R, E, A> extends Connect<R, E, A, WebSocketClientConfig & AppConfig['info']> {
    private ws: WebSocket | undefined
    public status: 'started' | 'shutdown' = 'shutdown'
    private can_send = false
    private id

    constructor(config: WebSocketClientConfig & AppConfig['info'], action_handler: ActionHandler<A, R>, optional: ConnectOptional) {
        super(config, action_handler, optional)
        this.id = optional.id
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
        this.ws.addEventListener('open', () => {
            this.optional?.connected_handler && this.optional.connected_handler(this.id)
            this.can_send = true
        })
        this.ws.addEventListener('message', async ({ data }) => {
            if (data instanceof ArrayBuffer) {
                const resp = await this.action_handler(unpack(new Uint8Array(data)), true)
                this.send(resp, { send_msgpack: true })
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
    public send(data: R | E, optional?: SendOptional): void {
        if (this.status === 'started') {
            if (!this.can_send && typeof optional?.cid === 'undefined') return
            this.wsSend(this.ws!, data, optional?.send_msgpack)
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
    private connections: Map<string, WSSConnectionsValue> = new Map()
    private id: string
    private sub_id_total = 0

    constructor(config: WebSocketServerConfig, action_handler: ActionHandler<A, R>, optional: ConnectOptional) {
        super(config, action_handler, optional)
        this.id = optional.id
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
            this.sub_id_total++
            const sid = this.sub_id_total.toString()
            this.connections.set(sid, { ws: socket, can_send: false })
            socket.addEventListener('open', () => {
                this.optional?.connected_handler && this.optional.connected_handler(`${this.id}:${sid}`)
                this.connections.set(sid, { ws: socket, can_send: true })
            })
            socket.addEventListener('message', async ({ data }) => {
                if (data instanceof ArrayBuffer) {
                    const resp = await this.action_handler(unpack(new Uint8Array(data)), true)
                    this.send(resp, { send_msgpack: true })
                } else {
                    const resp = await this.action_handler(JSON.parse(data), this.config.send_msgpack)
                    this.send(resp)
                }
            })
            socket.addEventListener('close', () => {
                this.connections.delete(sid)
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
    public send(data: R | E, optional?: SendOptional): void {
        if (this.status === 'started') {
            let send_msgpack = optional?.send_msgpack
            if (typeof send_msgpack === 'undefined') {
                send_msgpack = this.config.send_msgpack
            }
            const serialization = this.serialize(data, send_msgpack)
            if (optional?.cid) {
                const ids = optional?.cid.split(':')
                if (ids.length > 1){
                    const { ws } = this.connections.get(ids[1])!
                    this.wsSend(ws, serialization, true)
                    return
                }
            }
            for (const [, { ws, can_send }] of this.connections) {
                if (!can_send) continue
                this.wsSend(ws, serialization, true)
            }
        }
    }
}

interface SendOptional {
    send_msgpack?: boolean
    cid?: string
}