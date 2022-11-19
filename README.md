# Dnlibob

[![OneBot](https://img.shields.io/badge/OneBot-12-black)](https://12.onebot.dev/)
[![Version](https://img.shields.io/github/v/tag/botuniverse/dnlibob.svg)](https://github.com/botuniverse/dnlibob/releases)
[![License](https://img.shields.io/github/license/botuniverse/dnlibob)](https://github.com/botuniverse/dnlibob/blob/main/LICENSE)
[![Deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/dnlibob/mod.ts)

这是一个 LibOneBot，提供了 OneBot Connect 的实现和（OneBot
的）事件、动作、消息段等数据模型的类型定义。该库处于未完成的状态，欢迎你与我们一同构建。

## Examples

### Basic usage

```ts
import * as Dnlibob from "https://deno.land/x/dnlibob@0.12.0/mod.ts";

const ob = new App((data) => {
  switch (data.action) {
    default:
      return {
        status: "ok",
        retcode: 0,
        data: null,
        message: "",
      };
  }
}, () => {});

ob.start({
  basic: {
    onebot_version: "12",
    impl: "test",
  },
  ws: [{
    host: "127.0.0.1",
    port: 9322,
    send_msgpack: false,
  }],
});
```
