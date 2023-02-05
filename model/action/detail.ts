import * as _Params from './param.ts'
import { ExtendedMap } from '../share.ts'
import { ActionBase } from './mod.ts'

export { _Params }

/** 获取最新事件列表
 * - 仅 HTTP 通信方式必须支持，用于轮询获取事件。
*/
export interface GetLatestEvents extends ActionBase {
    action: 'get_latest_events'
    params: _Params.GetLatestEvents & ExtendedMap
}

/** 获取支持的动作列表 */
export interface GetSupportedActions extends ActionBase {
    action: 'get_supported_actions'
    params: _Params.GetSupportedActions & ExtendedMap
}

/** 获取运行状态 */
export interface GetStatus extends ActionBase {
    action: 'get_status'
    params: _Params.GetStatus & ExtendedMap
}

/** 获取版本信息 */
export interface GetVersion extends ActionBase {
    action: 'get_version'
    params: _Params.GetVersion & ExtendedMap
}

/** 发送消息 */
export interface SendMessage extends ActionBase {
    action: 'send_message'
    params: _Params.SendMessage & ExtendedMap
}

/** 撤回消息 */
export interface DeleteMessage extends ActionBase {
    action: 'delete_message'
    params: _Params.DeleteMessage & ExtendedMap
}

/** 获取机器人自身信息 */
export interface GetSelfInfo extends ActionBase {
    action: 'get_self_info'
    params: _Params.GetSelfInfo & ExtendedMap
}

/** 获取用户信息 */
export interface GetUserInfo extends ActionBase {
    action: 'get_user_info'
    params: _Params.GetUserInfo & ExtendedMap
}

/** 获取好友列表
 * - 获取机器人的关注者或好友列表
*/
export interface GetFriendList extends ActionBase {
    action: 'get_friend_list'
    params: _Params.GetFriendList & ExtendedMap
}

/** 获取群信息 */
export interface GetGroupInfo extends ActionBase {
    action: 'get_group_info'
    params: _Params.GetGroupInfo & ExtendedMap
}

/** 获取群列表
 * - 获取机器人加入的群列表
*/
export interface GetGroupList extends ActionBase {
    action: 'get_group_list'
    params: _Params.GetGroupList & ExtendedMap
}

/** 获取群成员信息 */
export interface GetGroupMemberInfo extends ActionBase {
    action: 'get_group_member_info'
    params: _Params.GetGroupMemberInfo & ExtendedMap
}

/** 获取群成员列表 */
export interface GetGroupMemberList extends ActionBase {
    action: 'get_group_member_list'
    params: _Params.GetGroupMemberList & ExtendedMap
}

/** 设置群名称 */
export interface SetGroupName extends ActionBase {
    action: 'set_group_name'
    params: _Params.SetGroupName & ExtendedMap
}

/** 退出群 */
export interface LeaveGroup extends ActionBase {
    action: 'leave_group'
    params: _Params.LeaveGroup & ExtendedMap
}

/** 获取群组信息 */
export interface GetGuildInfo extends ActionBase {
    action: 'get_guild_info'
    params: _Params.GetGuildInfo & ExtendedMap
}

/** 获取群组列表
 * - 获取机器人加入的群组列表
*/
export interface GetGuildList extends ActionBase {
    action: 'get_guild_list'
    params: _Params.GetGuildList & ExtendedMap
}

/** 设置群组名称 */
export interface SetGuildName extends ActionBase {
    action: 'set_guild_name'
    params: _Params.SetGuildName & ExtendedMap
}

/** 获取群组成员信息 */
export interface GetGuildMemberInfo extends ActionBase {
    action: 'get_guild_member_info'
    params: _Params.GetGuildMemberInfo & ExtendedMap
}

/** 获取群组成员列表 */
export interface GetGuildMemberList extends ActionBase {
    action: 'get_guild_member_list'
    params: _Params.GetGuildMemberList & ExtendedMap
}

/** 退出群组 */
export interface LeaveGuild extends ActionBase {
    action: 'leave_guild'
    params: _Params.LeaveGuild & ExtendedMap
}

/** 获取频道信息 */
export interface GetChannelInfo extends ActionBase {
    action: 'get_channel_info'
    params: _Params.GetChannelInfo & ExtendedMap
}

/** 获取频道列表
 * - 获取指定群组中机器人可见的频道列表
*/
export interface GetChannelList extends ActionBase {
    action: 'get_channel_list'
    params: _Params.GetChannelList & ExtendedMap
}

/** 设置频道名称 */
export interface SetChannelName extends ActionBase {
    action: 'set_channel_name'
    params: _Params.SetChannelName & ExtendedMap
}

/** 获取频道成员信息 */
export interface GetChannelMemberInfo extends ActionBase {
    action: 'get_channel_member_info'
    params: _Params.GetChannelMemberInfo & ExtendedMap
}

/** 获取频道成员列表 */
export interface GetChannelMemberList extends ActionBase {
    action: 'get_channel_member_list'
    params: _Params.GetChannelMemberList & ExtendedMap
}

/** 退出频道 */
export interface LeaveChannel extends ActionBase {
    action: 'leave_channel'
    params: _Params.LeaveChannel & ExtendedMap
}

/** 上传文件 */
export interface UploadFile extends ActionBase {
    action: 'upload_file'
    params: _Params.UploadFile & ExtendedMap
}

/** 分片上传文件
 *  - 准备阶段
 */
export interface UploadFileFragmentedPrepare extends ActionBase {
    action: 'upload_file_fragmented'
    params: _Params.UploadFileFragmentedPrepare & ExtendedMap
}

/** 分片上传文件
 *  - 传输阶段
 */
export interface UploadFileFragmentedTransfer extends ActionBase {
    action: 'upload_file_fragmented'
    params: _Params.UploadFileFragmentedTransfer & ExtendedMap
}

/** 分片上传文件
 *  - 结束阶段
 */
export interface UploadFileFragmentedFinish extends ActionBase {
    action: 'upload_file_fragmented'
    params: _Params.UploadFileFragmentedFinish & ExtendedMap
}

/** 获取文件 */
export interface GetFile extends ActionBase {
    action: 'get_file'
    params: _Params.GetFile & ExtendedMap
}

/** 分片获取文件
 * - 准备阶段
 */
export interface GetFileFragmentedPrepare extends ActionBase {
    action: 'get_file_fragmented'
    params: _Params.GetFileFragmentedPrepare & ExtendedMap
}

/** 分片获取文件
 * - 传输阶段
 */
export interface GetFileFragmentedTransfer extends ActionBase {
    action: 'get_file_fragmented'
    params: _Params.GetFileFragmentedTransfer & ExtendedMap
}
