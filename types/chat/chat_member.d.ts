import { ITChat, ITChatInviteLink } from '.'
import { ITUser } from '../user'
type ITChatMember = ITChatMemberOwner
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
  Banned = 'kicked'
}


interface ITChatMemberBase {
  status:	ETChatMemberStatus
  user:	ITUser  // Information about the user
}

interface ITChatMemberAdm extends ITChatMemberBase {
  is_anonymous: boolean // True, if the user's presence in the chat is hidden
  custom_title?: string	// Custom title for this user
}

interface ITChatMemberOwner extends ITChatMemberAdm {
  status:	ETChatMemberStatus.Owner //	The member's status in the chat, always “creator”
}

interface ITChatMemberAdministrator extends ITChatMemberAdm {
  status:	ETChatMemberStatus.Admin // The member's status in the chat, always “administrator”
  can_be_edited: boolean // True, if the bot is allowed to edit administrator privileges of that user
  can_manage_chat: boolean // True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege
  can_delete_messages: boolean // True, if the administrator can delete messages of other users
  can_manage_voice_chats: boolean // True, if the administrator can manage voice chats
  can_restrict_members: boolean // True, if the administrator can restrict, ban or unban chat members
  can_promote_members: boolean // True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user)
  can_change_info: boolean // True, if the user is allowed to change the chat title, photo and other settings
  can_invite_users:	boolean // True, if the user is allowed to invite new users to the chat
  can_post_messages?:	boolean // True, if the administrator can post in the channel; channels only
  can_edit_messages?:	boolean // True, if the administrator can edit messages of other users and can pin messages; channels only
  can_pin_messages?: boolean // True, if the user is allowed to pin messages; groups and supergroups only 
}

interface ITChatMemberMember {
  status:	ETChatMemberStatus.Member // The member's status in the chat, always “member”
  user:	ITUser // Information about the user
}

export interface ITChatMemberRestricted extends ITChatMemberBase {
  status:	ETChatMemberStatus.Restricted // The member's status in the chat, always “restricted”
  is_member: boolean // True, if the user is a member of the chat at the moment of the request
  can_change_info: boolean // True, if the user is allowed to change the chat title, photo and other settings
  can_invite_users: boolean // True, if the user is allowed to invite new users to the chat
  can_pin_messages: boolean // True, if the user is allowed to pin messages
  can_send_messages: boolean // True, if the user is allowed to send text messages, contacts, locations and venues
  can_send_media_messages: boolean // True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes
  can_send_polls: boolean // True, if the user is allowed to send polls
  can_send_other_messages: boolean // True, if the user is allowed to send animations, games, stickers and use inline bots
  can_add_web_page_previews: boolean // True, if the user is allowed to add web page previews to their messages
  until_date: number // Date when restrictions will be lifted for this user; unix time. If 0, then the user is restricted forever
}
export interface ITChatMemberLeft extends ITChatMemberBase {
  status:	ETChatMemberStatus.Left // The member's status in the chat, always “left”
}
export interface ITChatMemberBanned extends ITChatMemberBase {
  status:	ETChatMemberStatus.Banned // The member's status in the chat, always “kicked”
}
export interface ITChatMemberUpdated {
  chat:	ITChat	//Chat the user belongs to
  from:	ITUser	//Performer of the action, which resulted in the change
  date: number,	//Integer	Date the change was done in Unix time
  old_chat_member:	ITChatMember	// Previous information about the chat member
  new_chat_member:	ITChatMember	// New information about the chat member
  invite_link?:	ITChatInviteLink	// Chat invite link, which was used by the user to join the chat; for joining by invite link events only.
}