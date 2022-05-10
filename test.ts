import { OneBot, ImplConfig, DefaultHandler } from "./src/mod.ts"

const ob = new OneBot({
    impl: "idr",
    platform: "telegram",
    self_id: "114514",
    config: ImplConfig.Default(),
    action_handler: new DefaultHandler()
})

ob.run()


//deno run --allow-all test.ts