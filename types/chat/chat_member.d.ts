import { ITChat, ITChatInviteLink } from '.'
import { ITUser } from '../user'

type ITChatMember =
  | ITChatMemberOwner
  | ITChatMemberAdministrator
  | ITChatMemberMember
  | ITChatMemberRestricted
  | ITChatMemberLeft
  | ITChatMemberBanned

export enum ETChatMemberStatus {
  Owner = 'creator',
  Admin = 'administrator',
  Member = 'member',
  Restricted = 'restricted',
  Left = 'left',
  Banned = 'kicked',
}
interface ITChatMemberBase {
  status: ETChatMemberStatus
  user: ITUser
}

interface ITChatMemberAdm extends ITChatMemberBase {
  is_anonymous: boolean
  custom_title?: string
}

interface ITChatMemberOwner extends ITChatMemberAdm {
  status: ETChatMemberStatus.Owner
}

interface ITChatMemberAdministrator extends ITChatMemberAdm {
  status: ETChatMemberStatus.Admin
  can_be_edited: boolean
  can_manage_chat: boolean
  can_delete_messages: boolean
  can_manage_voice_chats: boolean
  can_restrict_members: boolean
  can_promote_members: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_post_messages?: boolean
  can_edit_messages?: boolean
  can_pin_messages?: boolean
}

interface ITChatMemberMember {
  status: ETChatMemberStatus.Member
  user: ITUser
}

export interface ITChatMemberRestricted extends ITChatMemberBase {
  status: ETChatMemberStatus.Restricted
  is_member: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_pin_messages: boolean
  can_send_messages: boolean
  can_send_media_messages: boolean
  can_send_polls: boolean
  can_send_other_messages: boolean
  can_add_web_page_previews: boolean
  until_date: number
}
export interface ITChatMemberLeft extends ITChatMemberBase {
  status: ETChatMemberStatus.Left
}
export interface ITChatMemberBanned extends ITChatMemberBase {
  status: ETChatMemberStatus.Banned
}
export interface ITChatMemberUpdated {
  chat: ITChat
  from: ITUser
  date: number
  old_chat_member: ITChatMember
  new_chat_member: ITChatMember
  invite_link?: ITChatInviteLink
}