export interface Self {
    /** 机器人用户 ID */
    user_id: string
    /** 机器人平台名称 */
    platform: string
}

export interface Bot {
    /** 机器人自身标识 */
    online: boolean
    /** 机器人账号是否在线（可收发消息等） */
    self: Self
}

export interface Status {
    /** 是否各项状态都符合预期，OneBot 实现各模块均正常 */
    good: boolean
    /** 当前 OneBot Connect 连接上所有机器人账号的状态列表 */
    bots: Bot[]
}