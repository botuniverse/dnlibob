export type ActionHandler<A, R> = (data: A, send_msgpack: boolean) => Promise<R> | R

export abstract class Connect<R, E, A, C>{
    abstract status: 'started' | 'shutdown'
    constructor(protected readonly config: C, protected readonly action_handler: ActionHandler<A, R>, protected readonly connected_handler: ConnectedHandler<E>) { }
    abstract start(signal: AbortSignal): void
    abstract shutdown(): void
    abstract send(data: R | E, send_msgpack?: boolean): void
}

export type ConnectedHandler<E> = () => Promise<E[]> | E[]

export interface ExtraConnectConfig {
    onebot_version: string
    impl: string
}