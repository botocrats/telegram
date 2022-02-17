import { JSON } from '..'
import { ITUser } from '../user'
import { ITMessage } from '../message'
import { ITLocationBasic, TTAttachment, ITChatPhoto } from '../objects'
import { ITChatMember, ITChatMemberAdministrator, ITChatMemberOwner } from './chat_member'
export * from './chat_member'

export enum ETChatType {
  Private = 'private',
  Group = 'group',
  SuperGroup = 'supergroup',
  Channel = 'channel'
}
export interface ITChat {
  id: number 
  type: ETChatType
  title: string
  username?: string
  first_name?: string
  last_name?: string
}

export interface ITChatDetailed extends ITChat {
  photo?: ITChatPhoto
  bio?: string
  has_private_forwards?: boolean
  description?: string
  invite_link?: string
  pinned_message?: ITMessage
  permissions?: ITChatPermissions
  slow_mode_delay?: number
  message_auto_delete_time?: number
  has_protected_content?: boolean
  sticker_set_name?: string
  can_set_sticker_set?: boolean
  linked_chat_id?: number
  location?: ITChatLocation
}
export type ITChatAdministrators = [ITChatMemberOwner, ...ITChatMemberAdministrator[]]
export interface ITChatPermissions {
  can_send_messages?: boolean
  can_send_media_messages?: boolean
  can_send_polls?: boolean
  can_send_other_messages?: boolean
  can_add_web_page_previews?: boolean
  can_change_info?: boolean
  can_invite_users?: boolean
  can_pin_messages?: boolean
}
interface ITChatInviteLinkOptionals {
  name?: string
  expire_date?: number
  member_limit?: number
  creates_join_request?: boolean
}

export interface ITChatInviteLink extends ITChatInviteLinkOptionals {
  invite_link: string
  creator: ITUser
  is_primary: boolean
  is_revoked: boolean
  pending_join_request_count?: number
}
export type TTChatIdType = number | string // number: chat id, string: username
export interface ITChatId {
  chat_id: TTChatIdType
}
export interface ITUserId extends ITChatId {
  user_id: number
}

export enum ETChatActionType {
  Message = 'typing',
  Photo ='upload_photo',
  Document = 'upload_document',
  Voice = 'upload_voice',
  VoiceNote = 'upload_voice_note',
  Video = 'record_video',
  Location = 'find_location',
  Sticker = 'choose_sticker'
}

export interface ITChatJoinRequest {
  chat: ITChat // Chat to which the request was sent
  from: ITUser // User that sent the join request
  date: number // Date the request was sent in Unix time 
  bio?: string // Bio of the user.
  invite_link?: ITChatInviteLink // Chat invite link that was used by the user to send the join request
}
export interface ITChatLocation {
  location: ITLocationBasic
  address: string
}
export interface ITChatMethods {
  sendChatAction: (params: ITChatId & {action: ETChatActionType}) => Promise<boolean>
  banChatMember: (params: ITUserId & { only_if_banned?: boolean, until_date?: number, revoke_messages?: boolean }) => Promise<boolean>
  unbanChatMember: (params: ITUserId & { only_if_banned?: boolean }) => Promise<boolean>
  restrictChatMember: (params: ITUserId & { permissions: JSON<ITChatPermissions>, until_date?: number }) => Promise<boolean>
  promoteChatMember: (params: ITUserId & ITChatId & Omit<ITChatMemberAdministrator, "status"| "can_be_edited">) => Promise<boolean>
  setChatAdministratorCustomTitle: (params: ITUserId & { custom_title: string }) => Promise<boolean>
  banChatSenderChat: (params: ITChatId & {sender_chat_id: number}) => Promise<boolean>
  unbanChatSenderChat: (params: ITChatId & {sender_chat_id: number}) => Promise<boolean>
  setChatPermissions: (params: ITChatId&{permissions: JSON<ITChatPermissions>}) => Promise<boolean>
  exportChatInviteLink: (params: ITChatId) => Promise<string>
  createChatInviteLink: (params: ITChatId & ITChatInviteLinkOptionals) => Promise<ITChatInviteLink>
  editChatInviteLink:(params:ITChatId & {invite_link: string} & ITChatInviteLinkOptionals) => Promise<ITChatInviteLink>
  revokeChatInviteLink:(params:ITChatId & {invite_link: string}) => Promise<ITChatInviteLink>
  setChatPhoto: (params: ITChatId & {photo: TTAttachment}) => Promise<boolean>
  deleteChatPhoto: (params: ITChatId) => Promise<boolean>
  setChatTitle: (params: ITChatId & {title: string }) => Promise<boolean>
  setChatDescription: (params: ITChatId & { description: string }) => Promise<boolean>
  pinChatMessage: (params: ITChatId & {message_id:number,disable_notification?: boolean}) => Promise<boolean>
  unpinChatMessage: (params: ITChatId & {message_id?:number}) => Promise<boolean>
  unpinAllChatMessages: (params: ITChatId) => Promise<boolean>
  leaveChat: (params: ITChatId) => Promise<boolean>
  getChat: (params: ITChatId) => Promise<ITChatDetailed>
  getChatAdministrators: (params: ITChatId) => Promise<ITChatAdministrators>
  getChatMemberCount: (params: ITChatId) => Promise<number>
  getChatMember: (params: ITUserId) => Promise<ITChatMember>
  setChatStickerSet: (params: ITChatId & {sticker_set_name: string}) => Promise<boolean>
  deleteChatStickerSet: (params: ITChatId) => Promise<boolean>
}