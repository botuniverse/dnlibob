import { StandardAction } from "../action/mod.ts"
import { Resps, Resp, RespContent } from "../resp.ts"
import { App } from "../impls/mod.ts"

/** 实现端处理 Action 需要实现的 Abstract
 * - 请注意，请务必实现默认返回 `Resp.unsupported_action()`
 */
export abstract class ActionHandler<A = StandardAction, R = Resps, OB = App>{
    abstract handle(data: A, ob: OB): Promise<R>
}

export class DefaultHandler extends ActionHandler {
    async handle(data: StandardAction, _ob: App): Promise<Resps> {
        switch (data.action) {
            case "get_version":
                return Resp.success(get_version())
            default:
                return Resp.unsupported_action()
        }
    }
}

function get_version(): RespContent.GetVersion {
    return RespContent.GetVersion.Default()
}