import * as _Data from './param.ts'
import { RespBase } from './mod.ts'

export { _Data }

/** 获取最新事件列表
 * - 仅 HTTP 通信方式必须支持，用于轮询获取事件。
*/
export interface GetLatestEvents extends RespBase {
    data: Event[]
}

/** 获取支持的动作列表 */
export interface GetSupportedActions extends RespBase {
    data: string[]
}

/** 获取运行状态 */
export interface GetStatus extends RespBase {
    data: _Data.GetStatus
}

/** 获取版本信息 */
export interface GetVersion extends RespBase {
    data: _Data.GetVersion
}

/** 发送消息 */
export interface SendMessage extends RespBase {
    data: _Data.SendMessage
}

/** 撤回消息 */
export interface DeleteMessage extends RespBase {
    data: null
}

/** 获取机器人自身信息 */
export interface GetSelfInfo extends RespBase {
    data: _Data.GetSelfInfo
}

/** 获取用户信息 */
export interface GetUserInfo extends RespBase {
    data: _Data.GetUserInfo
}

/** 获取好友列表
 * - 获取机器人的关注者或好友列表
*/
export interface GetFriendList extends RespBase {
    data: GetUserInfo['data'][]
}

/** 获取群信息 */
export interface GetGroupInfo extends RespBase {
    data: _Data.GetGroupInfo
}

/** 获取群列表
 * - 获取机器人加入的群列表
*/
export interface GetGroupList extends RespBase {
    data: GetGroupInfo['data'][]
}

/** 获取群成员信息 */
export interface GetGroupMemberInfo extends RespBase {
    data: _Data.GetGroupMemberInfo
}

/** 获取群成员列表 */
export interface GetGroupMemberList extends RespBase {
    data: GetGroupMemberInfo['data'][]
}

/** 设置群名称 */
export interface SetGroupName extends RespBase {
    data: null
}

/** 退出群 */
export interface LeaveGroup extends RespBase {
    data: null
}

/** 获取群组信息 */
export interface GetGuildInfo extends RespBase {
    data: _Data.GetGuildInfo
}

/** 获取群组列表
 * - 获取机器人加入的群组列表
*/
export interface GetGuildList extends RespBase {
    data: GetGuildInfo['data'][]
}

/** 设置群组名称 */
export interface SetGuildName extends RespBase {
    data: null
}

/** 获取群组成员信息 */
export interface GetGuildMemberInfo extends RespBase {
    data: _Data.GetGuildMemberInfo
}

/** 获取群组成员列表 */
export interface GetGuildMemberList extends RespBase {
    data: GetGuildMemberInfo['data'][]
}

/** 退出群组 */
export interface LeaveGuild extends RespBase {
    data: null
}

/** 获取频道信息 */
export interface GetChannelInfo extends RespBase {
    data: _Data.GetChannelInfo
}

/** 获取频道列表
 * - 获取指定群组中机器人可见的频道列表
*/
export interface GetChannelList extends RespBase {
    data: GetChannelInfo['data'][]
}

/** 设置频道名称 */
export interface SetChannelName extends RespBase {
    data: null
}

/** 获取频道成员信息 */
export interface GetChannelMemberInfo extends RespBase {
    data: _Data.GetChannelMemberInfo
}

/** 获取频道成员列表 */
export interface GetChannelMemberList extends RespBase {
    data: GetChannelMemberInfo['data'][]
}

/** 退出频道 */
export interface LeaveChannel extends RespBase {
    data: null
}

/** 上传文件 */
export interface UploadFile extends RespBase {
    data: _Data.UploadFile
}

/** 分片上传文件
 *  - 准备阶段
 */
export interface UploadFileFragmentedPrepare extends RespBase {
    data: _Data.UploadFileFragmentedPrepare
}

/** 分片上传文件
 *  - 传输阶段
 */
export interface UploadFileFragmentedTransfer extends RespBase {
    data: null
}

/** 分片上传文件
 *  - 结束阶段
 */
export interface UploadFileFragmentedFinish extends RespBase {
    data: _Data.UploadFileFragmentedFinish
}

/** 获取文件 */
export interface GetFile extends RespBase {
    data: _Data.GetFile
}

/** 分片获取文件
 * - 准备阶段
 */
export interface GetFileFragmentedPrepare extends RespBase {
    data: _Data.GetFileFragmentedPrepare
}

/** 分片获取文件
 * - 传输阶段
 */
export interface GetFileFragmentedTransfer extends RespBase {
    data: _Data.GetFileFragmentedTransfer
}