export type ActionHandler<A, R> = (data: A, send_msgpack: boolean) => Promise<R> | R

export abstract class Connect<R, E, A, C>{
    abstract status: 'started' | 'shutdown'
    constructor(protected readonly config: C, protected readonly action_handler: ActionHandler<A, R>, protected readonly optional: ConnectOptional) { }
    abstract start(signal: AbortSignal): void
    abstract shutdown(): void
    abstract send(data: R | E, optional?: SendOptional): void
}

export type ConnectedHandler = (cid: string) => Promise<void> | void

interface SendOptional {
    send_msgpack?: boolean
    cid?: string
}

export interface ConnectOptional {
    connected_handler?: ConnectedHandler
    id: string
}