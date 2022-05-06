import { oak } from "../deps.ts";
import { Logger } from "./utils/logger.ts";
//import { Storage } from "./utils/storage.ts"
import { ActionHandler } from "./handle/index.ts"
import { CustomOneBot } from "./impls/index.ts"
import { HttpClient, HttpServer, WebSocketClient, WebSocketServer } from "./config.ts"
import { StandardEvent } from "./event/index.ts"
//import { msgpack } from "../deps.ts"

const logger = new Logger("Teyda_libonebot")

class HttpRegistry<E, A, R> extends Array {
    //private storages: Storage[] = []
    constructor(private action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>, private ob: CustomOneBot<E, A, R>) {
        super()
    }
    async create(config: HttpServer) {
        const app = new oak.Application();
        //let storage = new Storage(config.event_buffer_size)
        //this.storages.push(storage)
        app.use((ctx) => {
            if (config.access_token !== null && ctx.request.headers.get("Authorization") !== config.access_token) {
                ctx.response.status = oak.Status.Unauthorized;
            } else if (ctx.request.method !== "POST") {
                ctx.response.status = oak.Status.MethodNotAllowed;
            } else if (ctx.request.headers.get("content-type") !== "application/json") {
                ctx.response.status = oak.Status.UnsupportedMediaType;
            } else {
                ctx.response.body = this.action_handler.handle(ctx.request.body({ type: "json" }) as unknown as A, this.ob) as any;
                ctx.response.type = "json"
                ctx.response.status = oak.Status.OK
            }
        });
        await app.listen({
            hostname: config.host, port: config.port
        });
        return super.push(app)
    }
    send(_data: any) {
        /*if (data.detail_type !== "heartbeat") {
            for (let storage of this.storages) {
                storage.set(data)
            }
        }*/
    }
}

class WebhookRegistry extends Array {
    constructor() {
        super()
    }
    async create(config: HttpClient) {
        return super.push(new Webhook(config.url, config.access_token))
    }
    send(data: any) {
        if (typeof data.detail_type !== "undefined" && data.detail_type !== "heartbeat") {
            super.forEach(function (entry) {
                entry.send(JSON.stringify(data))
            })
        }
    }
}

class WsRegistry<E, A, R> extends Array {
    private sockets: WebSocket[] = []
    constructor(private action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>, private ob: CustomOneBot<E, A, R>) {
        super()
    }
    async create(config: WebSocketServer) {
        const app = new oak.Application();
        app.use((ctx) => {
            if (config.access_token && ctx.request.headers.get("Authorization") !== config.access_token) {
                ctx.response.status = oak.Status.Unauthorized;
            } else {
                ctx.upgrade()
                this.sockets.push(ctx.socket!)
                ctx.socket!.addEventListener("open", () => {
                    logger.info(`新的 websocket 连接来自 ${ctx.request.ip}`)
                })
                ctx.socket!.addEventListener("message", (e) => {
                    let parsed: any
                    try {
                        parsed = JSON.parse(e.data)
                        if (typeof parsed?.action === "undefined" || typeof parsed.params === "undefined") {
                            logger.warn(`请求格式不正确: "${e.data}"`)
                            parsed = null
                        }
                    } catch (err) {
                        logger.warn(`JSON 反序列化失败: "${e.data}"`)
                        parsed = null
                    }
                    if (parsed !== null) {
                        let echo: Record<string, any> = {}
                        if (typeof parsed.echo !== "undefined") {
                            echo = { echo: parsed.echo }
                            delete parsed.echo
                        }
                        let data = this.action_handler.handle(parsed, this.ob)
                        ctx.socket!.send(JSON.stringify(Object.assign(data, echo)))
                    }
                })
            }
        });
        app.addEventListener("listen", () => {
            super.push(app)
            logger.info(`websocket 监听在 ${logger.red(config.host + ":" + config.port)}`)
        })
        await app.listen({
            hostname: config.host, port: config.port
        });
    }
    send(data: any) {
        for (const entry of this.sockets) {
            if (entry.readyState === WebSocket.OPEN) {
                entry.send(JSON.stringify(data))
            }
        }
    }
}

class WsrRegistry<E, A, R> extends Array {
    private sockets: WebSocket[] = []
    constructor(private action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>, private ob: CustomOneBot<E, A, R>) {
        super()
    }
    async create(config: WebSocketClient) {
        const app = new Wsr()
        app.connect({
            url: config.url, reconnect_interval: config.reconnect_interval, add_callback: (socket) => {
                this.sockets.push(socket)
                socket.addEventListener("open", () => logger.info(`成功连接到 ${config.url}`))
                socket.addEventListener("message", (e) => {
                    let parsed: any
                    try {
                        parsed = JSON.parse(e.data)
                        if (typeof parsed?.action === "undefined" || typeof parsed.params === "undefined") {
                            logger.warn(`请求格式不正确: "${e.data}"`)
                            parsed = null
                        }
                    } catch (err) {
                        logger.warn(`JSON 反序列化失败: "${e.data}"`)
                        parsed = null
                    }
                    if (parsed !== null) {
                        let echo: Record<string, any> = {}
                        if (typeof parsed.echo !== "undefined") {
                            echo = { echo: parsed.echo }
                            delete parsed.echo
                        }
                        let data = this.action_handler.handle(parsed, this.ob)
                        socket.send(JSON.stringify(Object.assign(data, echo)))
                    }
                    //typeof e.data === "string" ? (parsed = JSON.parse(e.data)) : (parsed = msgpack.decode(e.data));
                })
            }, del_callback: (socket) => {
                const index = this.sockets.findIndex((element) => element === socket)
                this.sockets.splice(index, 1)
            }
        })
    }
    send(data: any) {
        for (const entry of this.sockets) {
            if (entry.readyState === WebSocket.OPEN) {
                entry.send(JSON.stringify(data))
            }
        }
    }
}

export class Rpc<E, A, R> {
    private all: Record<string, HttpRegistry<E, A, R> | WsRegistry<E, A, R> | WsrRegistry<E, A, R> | WebhookRegistry> = {}
    constructor(private action_handler: ActionHandler<A, R, CustomOneBot<E, A, R>>, private ob: CustomOneBot<E, A, R>) {
    }
    http(config: HttpServer[]) {
        const http = new HttpRegistry(this.action_handler, this.ob);
        for (const entry of config) {
            http.create(entry)
        }
        this.all.http = http
    }
    webhook(config: HttpClient[]) {
        const webhook = new WebhookRegistry();
        for (const entry of config) {
            webhook.create(entry)
        }
        this.all.webhook = webhook
    }
    ws(config: WebSocketServer[]) {
        const ws = new WsRegistry(this.action_handler, this.ob);
        for (const entry of config) {
            ws.create(entry)
        }
        this.all.ws = ws
    }
    wsr(config: WebSocketClient[]) {
        const wsr = new WsrRegistry(this.action_handler, this.ob);
        for (const entry of config) {
            wsr.create(entry)
        }
        this.all.wsr = wsr
    }
    send<H extends StandardEvent>(data: E | H) {
        this.all.http.send(data)
        this.all.webhook.send(data)
        this.all.ws.send(data)
        this.all.wsr.send(data)
    }
}

interface WsrConfig {
    url: string,
    reconnect_interval: number,
    add_callback: (arg0: WebSocket) => void,
    del_callback: (arg0: WebSocket | null) => void,
}

class Wsr {
    private url: string = ""
    private socket: WebSocket | null = null
    private reconnect_interval: number = 0
    private add_callback: (arg0: WebSocket) => void
    private del_callback: (arg0: WebSocket | null) => void
    constructor() {
        this.add_callback = () => { }
        this.del_callback = () => { }
    }
    reconnect() {
        logger.warn(`无法连接到 ${logger.red(this.url)}`)
        this.del_callback(this.socket)
        logger.info(`${this.reconnect_interval} 秒钟后重试`)
        setTimeout(() => {
            this.socket = new WebSocket(this.url)
            this.socket.addEventListener("close", this.reconnect.bind(this))
            this.add_callback(this.socket)
        }, this.reconnect_interval * 1000)
    }
    connect(config: WsrConfig) {
        logger.info(`正在启动 websocket 反向服务器。`)
        this.url = config.url
        this.reconnect_interval = config.reconnect_interval
        this.add_callback = config.add_callback
        this.del_callback = config.del_callback
        logger.info(`开始尝试连接到 ${logger.red(this.url)}`)
        this.socket = new WebSocket(config.url)
        this.socket.addEventListener("close", this.reconnect.bind(this))
        this.add_callback(this.socket)
    }
}

class Webhook {
    constructor(private url: string, private access_token: string | null | undefined) {
    }
    send(data: any) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.access_token && headers.append('Authorization', this.access_token);
        fetch(this.url, {
            method: 'POST',
            headers: headers,
            body: data,
        }).catch(error => {
            console.log(error)
        })

    }
}