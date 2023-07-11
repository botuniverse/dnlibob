// deno-lint-ignore-file no-explicit-any
import { App } from '../mod.ts'
import { RespBase, EventBase, ActionBase } from '../model/mod.ts'
import { noEmptyStr } from '../utils.ts'

export interface WebSocketClientConfig {
    protocol: 'ws-reverse'
    url: string
    accessToken?: string
    reconnectInterval: number
}

export interface WebSocketServerConfig {
    protocol: 'ws'
    host: string
    port: number
    accessToken?: string
}

export class WebSocketClient<E extends EventBase, A extends ActionBase, R extends RespBase> {
    private socket?: WebSocket
    constructor(private app: App<E, A, R>, private config: WebSocketClientConfig) {

    }
    start(signal: AbortSignal) {

    }
    send(event: E) {

    }
}

export class WebSocketServer<E extends EventBase, A extends ActionBase, R extends RespBase> {
    private connections: Map<number, WebSocket> = new Map()
    constructor(private app: App<E, A, R>, private config: WebSocketServerConfig) {
    }
    encode(value: any) {
        return JSON.stringify(value)
    }
    decode(value: any) {
        try {
            return JSON.parse(value)
        } catch (_e) {
            return {}
        }
    }
    start(signal: AbortSignal) {
        let total = 0
        signal.addEventListener('abort', () => {
            this.shutdown()
        })
        Deno.serve({
            port: this.config.port,
            hostname: this.config.host,
            signal
        }, (req) => {
            const upgrade = req.headers.get("upgrade") || ""
            if (upgrade.toLowerCase() != "websocket") {
                return new Response("request isn't trying to upgrade to websocket.")
            }
            const { socket, response } = Deno.upgradeWebSocket(req)
            total++
            const id = total
            socket.onopen = async () => {
                const connectedHandler = this.app.connectedHandler
                if (connectedHandler) {
                    const events = await connectedHandler()
                    if (socket.readyState !== socket.OPEN) {
                        return
                    }
                    for (const event of events) {
                        socket.send(this.encode(event))
                    }
                }
                this.connections.set(id, socket)
            }
            socket.onmessage = async (msg) => {
                const data = this.decode(msg.data)
                const actionHandler = this.app.actionHandler
                if (actionHandler) {
                    let resp
                    if (!data.action) {
                        resp = {
                            'status': 'failed',
                            'retcode': 10001,
                            'data': null,
                            'message': '无效的动作请求'
                        }
                    } else {
                        resp = await actionHandler(data)
                    }
                    if (noEmptyStr(data.echo)) {
                        resp = {
                            echo: data.echo,
                            ...resp
                        }
                    }
                    if (socket.readyState === socket.OPEN) {
                        socket.send(this.encode(resp))
                    }
                }
            }
            socket.onclose = () => {
                if (this.connections.has(id)) {
                    this.connections.delete(id)
                }
            }
            return response
        })
    }
    shutdown() {
        this.connections.forEach((ws) => {
            ws.close()
        })
    }
    send(event: E) {
        this.connections.forEach((ws) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(this.encode(event))
            }
        })
    }
}