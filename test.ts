import { App, ImplConfig, DefaultHandler } from "./mod.ts"

const ob = new App({
    impl: 'test',
    platform: 'empty',
    self_id: '10001',
    config: ImplConfig.Default(),
    action_handler: new DefaultHandler()
})

ob.run()

// deno run -A test.ts