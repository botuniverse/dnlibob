import { App } from './mod.ts'

const app = new App({
    info: {
        onebotVersion: '12',
        impl: 'test',
        platform: 'test'
    },
    connect: [{
        protocol: 'ws',
        host: '127.0.0.1',
        port: 9322,
    }]
    ,
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
                    data: {},
                    message: '不支持的动作请求'
                }
        }
    }
})

app.start()