
/** OneBot 实现端设置项 */
export interface ImplConfig {
    heartbeat: Heartbeat
    http: HttpServer[]
    http_webhook: HttpClient[]
    websocket: WebSocketServer[]
    websocket_rev: WebSocketClient[]
}

export namespace ImplConfig {
    export function Default(): ImplConfig {
        return {
            heartbeat: Heartbeat.Default(),
            http: [],
            http_webhook: [],
            websocket: [WebSocketServer.Default()],
            websocket_rev: [],
        }
    }
}

/** OneBot 心跳设置 */
export interface Heartbeat {
    /** 是否启用心跳 */
    enabled: boolean
    /** 心跳间隔，单位：毫秒，必须大于 0 */
    interval: number
}

export namespace Heartbeat {
    export function Default(): Heartbeat {
        return {
            enabled: true,
            interval: 4
        }
    }
}

/** OneBot Impl Http 通讯设置 */
export interface HttpServer {
    /** HTTP 服务器监听 IP */
    host: string
    /** HTTP 服务器监听端口 */
    port: number
    /** 访问令牌 */
    access_token?: string
    /** 是否启用 `get_latest_events` 元动作 */
    event_enable: boolean
    /** 事件缓冲区大小，超过该大小将会丢弃最旧的事件，0 表示不限大小 */
    event_buffer_size: number
}

export namespace HttpServer {
    export function Default(): HttpServer {
        return {
            host: "127.0.0.1",
            port: 6800,
            event_enable: true,
            event_buffer_size: 16
        }
    }
}

/** OneBot Impl Http Webhook 通讯设置 */
export interface HttpClient {
    url: string
    access_token?: string
    timeout: number
}

export namespace HttpClient {
    export function Default(): HttpClient {
        return {
            url: "http://127.0.0.1:6900",
            timeout: 4
        }
    }

}

/** OneBot WebSocket 服务器设置 */
export interface WebSocketServer {
    /** WebSocket 服务器监听 IP */
    host: string
    /** WebSocket 服务器监听端口 */
    port: number
    /** 访问令牌 */
    access_token?: string
}

export namespace WebSocketServer {
    export function Default(): WebSocketServer {
        return{
            host: "127.0.0.1",
            port: 8855,
        }
    }
}

/** OneBot Impl 反向 WebSocket 通讯设置 */
export interface WebSocketClient {
    /** 反向 WebSocket 连接地址 */
    url: string
    /** 访问令牌 */
    access_token?: string
    /** 反向 WebSocket 重连间隔，单位：毫秒，必须大于 0 */
    reconnect_interval: number
}

export namespace WebSocketClient {
    export function Default(): WebSocketClient {
        return{
            url: "ws://127.0.0.1:8866",
            reconnect_interval: 4
        }
    }
}

