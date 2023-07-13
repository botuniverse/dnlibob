import { App } from './mod.ts'

const app = new App({
    basic: {
        onebotVersion: '12',
        impl: 'test',
        platform: 'test'
    },
    connect: [{
        protocol: 'ws',
        host: '127.0.0.1',
        port: 9322,
    }],
    actionHandler: (data) => {
        switch (data.action) {
            case 'get_version':
                return {
                    status: 'ok',
                    retcode: 0,
                    data: {
                        impl: 'deno-onebot-tg',
                        version: '0.0.1',
                        onebot_version: '12'
                    },
                    message: ''
                }
            default:
                return {
                    status: 'failed',
                    retcode: 10002,
                    data: null,
                    message: '不支持的动作请求'
                }
        }
    },
    connectedHandler: () => {
        return [{
            "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
            "time": 1632847927.599013,
            "type": "meta",
            "detail_type": "connect",
            "sub_type": "",
            "version": {
                "impl": "deno-onebot-tg",
                "version": "1.2.0",
                "onebot_version": "12"
            }
        }]
    }
})

app.start()

setInterval(() => {
    app.send({
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "time": 1632847927.599013,
        "type": "meta",
        "detail_type": "heartbeat",
        "sub_type": "",
        "interval": 5000
    })
}, 2000)