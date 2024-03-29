// deno-lint-ignore-file no-explicit-any
import { App } from '../mod.ts'
import { Events } from '../model/mod.ts'
import { noEmptyStr } from '../utils.ts'
import { decode as decodeMsgpack, encode as encodeMsgpack } from '../deps.ts'

export interface WebSocketClientConfig {
    protocol: 'ws-reverse'
    url: string
    accessToken?: string
    reconnectInterval: number
    sendMsgpack?: boolean
}

export interface WebSocketServerConfig {
    protocol: 'ws'
    host: string
    port: number
    accessToken?: string
    sendMsgpack?: boolean
}

export class WebSocketClient {
    private socket?: WebSocket
    constructor(private app: App, private config: WebSocketClientConfig) {
    }
    private encode(value: any, isMsgpack = this.config.sendMsgpack) {
        if (isMsgpack) {
            return encodeMsgpack(value)
        }
        return JSON.stringify(value)
    }
    private connect(url: string, interval: number) {
        const socket = new WebSocket(url, `${this.app.info.onebotVersion}.${this.app.info.impl}`)
        socket.binaryType = 'arraybuffer'
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
            this.socket = socket
        }
        socket.onmessage = async (msg) => {
            const { data, isMsgpack } = decode(msg.data)
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
                    resp = await actionHandler(data, isMsgpack)
                }
                if (noEmptyStr(data.echo)) {
                    resp = {
                        echo: data.echo,
                        ...resp
                    }
                }
                if (socket.readyState === socket.OPEN) {
                    socket.send(this.encode(resp, isMsgpack))
                }
            }
        }
        socket.onclose = () => {
            this.socket = undefined
            setTimeout(() => {
                this.connect(url, interval)
            }, interval)
        }
    }
    start(signal: AbortSignal) {
        signal.addEventListener('abort', () => {
            this.shutdown()
        })
        let suffix = ''
        if (this.config.accessToken) {
            suffix = this.config.accessToken
        }
        this.connect(`${this.config.url}${suffix}`, this.config.reconnectInterval)
    }
    shutdown() {
        if (this.socket !== undefined) {
            this.socket.close()
        }
    }
    send(event: Events) {
        const socket = this.socket
        if (socket !== undefined && socket.readyState === socket.OPEN) {
            socket.send(this.encode(event))
        }
    }
}

export class WebSocketServer {
    private connections: Map<number, WebSocket> = new Map()
    constructor(private app: App, private config: WebSocketServerConfig) {
    }
    private encode(value: any, isMsgpack = this.config.sendMsgpack) {
        if (isMsgpack) {
            return encodeMsgpack(value)
        }
        return JSON.stringify(value)
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
            const upgrade = req.headers.get('upgrade') || ''
            if (upgrade.toLowerCase() != 'websocket') {
                return new Response("request isn't trying to upgrade to websocket.")
            }

            const localToken = this.config.accessToken
            if (noEmptyStr(localToken)) {
                let block = false
                if (req.headers.has('authorization')) {
                    const remote = `Bearer ${req.headers.get('authorization')}`
                    const local = `Bearer ${localToken}`
                    if (remote !== local) {
                        block = true
                    }
                }
                const params = new URL(req.url).searchParams
                if (params.has('access_token') && params.get('access_token') !== localToken) {
                    block = true
                }
                if (block) {
                    return new Response("authentication failure.", {
                        status: 401,
                    })
                }
            }

            const { socket, response } = Deno.upgradeWebSocket(req)
            total++
            const id = total
            socket.binaryType = 'arraybuffer'
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
                const { data, isMsgpack } = decode(msg.data)
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
                        resp = await actionHandler(data, isMsgpack)
                    }
                    if (noEmptyStr(data.echo)) {
                        resp = {
                            echo: data.echo,
                            ...resp
                        }
                    }
                    if (socket.readyState === socket.OPEN) {
                        socket.send(this.encode(resp, isMsgpack))
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
    send(event: Events) {
        this.connections.forEach((ws) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(this.encode(event))
            }
        })
    }
}

function decode(value: any) {
    let data
    let isMsgpack = false
    try {
        if (value instanceof ArrayBuffer) {
            isMsgpack = true
            data = decodeMsgpack(new Uint8Array(value))
        } else {
            data = JSON.parse(value)
        }
    } catch (_e) {
        data = {}
    }
    return {
        data,
        isMsgpack
    }
}