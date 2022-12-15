import { App } from './mod.ts'

const ob = new App((data) => {
    switch (data.action) {
        default:
            return {
                status: "ok",
                retcode: 0,
                data: null,
                message: ''
            }
    }
}, () => { })

ob.start({
    basic: {
        onebot_version: '12',
        impl: 'test'
    },
    ws: [{
        host: '127.0.0.1',
        port: 9322,
        send_msgpack: false
    }]
})

setInterval(() => {
    ob.send({
        "id": "0",
        "time": 0,
        "type": "meta",
        "detail_type": "heartbeat",
        "sub_type": "",
        "interval": 2000
    })
}, 2000)