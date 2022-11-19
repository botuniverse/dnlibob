export * from './ws.ts'
import { AppConfig } from '../mod.ts'

export type ActionHandler<A, R> = (data: A, send_msgpack: boolean) => Promise<R> | R

export abstract class Connect<R, E, A, C extends AppConfig['basic'] = AppConfig['basic']>{
    abstract status: 'started' | 'shutdown'
    constructor(protected readonly config: C, protected readonly action_handler: ActionHandler<A, R>, protected readonly connect_handler: () => void) { }
    abstract start(signal: AbortSignal): void
    abstract shutdown(): void
    abstract send(data: R | E, send_msgpack?: boolean): void
}