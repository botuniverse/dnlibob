import { StandardAction, StandardActionEnum } from "../action.ts"
import { Resps, Resp, VersionContent } from "../resp.ts"
import { CustomOneBot } from "../impls/index.ts"

export abstract class ActionHandler<A, R, OB>{
    abstract handle(data: A, ob: OB): R
}

export class DefaultHandler<E> extends ActionHandler<StandardAction, Resps, CustomOneBot<E, StandardAction, Resps>>{
    handle(data: StandardAction, _ob: CustomOneBot<E, StandardAction, Resps>): Resps {
        switch (data.action) {
            case StandardActionEnum.GetVersion:
                return Resp.success(get_version())
            default:
                return Resp.unsupported_action()
        }
    }
}

function get_version(): VersionContent {
    return VersionContent.Default()
}