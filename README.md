# Dnlibob

[![OneBot](https://img.shields.io/badge/OneBot-12-black)](https://12.onebot.dev/)
[![Version](https://img.shields.io/github/v/tag/botuniverse/dnlibob.svg)](https://github.com/botuniverse/dnlibob/releases)
[![License](https://img.shields.io/github/license/botuniverse/dnlibob)](https://github.com/botuniverse/dnlibob/blob/main/LICENSE)
[![Deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/dnlibob/mod.ts)

这是一个 Deno 的 LibOneBot 库，可以帮助 OneBot 实现者快速在新的聊天机器人平台实现 OneBot 标准。

## Features

- 提供 OneBot v12 事件、动作、消息段等数据模型的类型定义，并支持扩展
- 提供 OneBot v12 标准网络通讯协议 (Http HttpWebhook 暂未支持)

## Examples

[Deno](https://github.com/denoland/deno) 1.35.0 or higher is required.

### Basic usage

```ts
import { App } from 'https://deno.land/x/dnlibob@0.21.0/mod.ts'

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
```
