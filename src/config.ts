
/// OneBot 实现端设置项
export interface ImplConfig {
    heartbeat: Heartbeat,
    http: HttpServer[],
    http_webhook: HttpClient[],
    websocket: WebSocketServer[],
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

/// OneBot 心跳设置
export interface Heartbeat {
    enabled: boolean,
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

/// OneBot Impl Http 通讯设置
export interface HttpServer {
    host: string,
    port: number,
    access_token?: string | null,
    event_enable: boolean,
    event_buffer_size: number,
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

/// OneBot Impl Http Webhook 通讯设置
export interface HttpClient {
    url: string,
    access_token?: string | null,
    timeout: number,
}

export namespace HttpClient {
    export function Default(): HttpClient {
        return {
            url: "http://127.0.0.1:6900",
            access_token: null,
            timeout: 4
        }
    }

}

/// OneBot WebSocket 服务器设置
export interface WebSocketServer {
    host: string,
    port: number,
    access_token?: string | null,
}

export namespace WebSocketServer {
    export function Default(): WebSocketServer {
        return{
            host: "127.0.0.1",
            port: 8855,
        }
    }
}

/// OneBot Impl 反向 WebSocket 通讯设置
export interface WebSocketClient {
    url: string,
    access_token?: string | null,
    reconnect_interval: number,
}

export namespace WebSocketClient {
    export function Default(): WebSocketClient {
        return{
            url: "ws://127.0.0.1:8866",
            reconnect_interval: 4
        }
    }
}

