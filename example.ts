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
})

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
}, () => {
    return {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "time": 1632847927.599013,
        "type": "meta",
        "detail_type": "connect",
        "sub_type": "",
        "version": {
            "impl": "go-onebot-qq",
            "version": "1.2.0",
            "onebot_version": "12"
        }
    }
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