export * from './ws.ts'

export type ActionHandler<A, R> = (data: A, send_msgpack: boolean) => Promise<R>