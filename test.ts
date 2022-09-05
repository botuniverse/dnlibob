import { OneBot } from './mod.ts'

const ob = new OneBot(() => {
})

ob.start({
    basic: {
        onebot_version: 12,
        impl: 'test'
    },
    wsr: [{
        host: '127.0.0.1',
        port: 9322,
        send_msgpack: false
    }]
})