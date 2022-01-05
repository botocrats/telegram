import { ITUser } from '..'
import { ITChat } from '../chat'
export { ITMessageMethods, TTAttachmentType } from './send'

export enum ETDiceEmoji {
  Default = "🎲",
  Dice = "🎲",
  Dart = "🎯",
  Bowling = "🎳",
  Basketball ="🏀",
  Football = "⚽",
  Slot = "🎰"
}
interface ITDice {
  emoji: ETDiceEmoji
  value: number
}

type TTEntityType = "mention" | "hashtag" | "cashtag" | "url" | "email" | "phone_number"
  | "bold" | "italic" | "strikethrough" | "code" | "pre" | "text_link" | "text_mention" | "spoiler"

export interface ITMessageEntity {
  type: TTEntityType
  offset: number
  length: number
  url?: string
  user?: ITUser
  language?: string
}
export interface ITForwardedMessage {
  forward_from?: ITUser
  forward_from_chat?: ITChat
  forward_from_message_id?: number
  forward_signature?: string
  forward_sender_name?: string
  forward_date?: number
  is_automatic_forward?: boolean
}
export interface ITMessage extends ITForwardedMessage {
  message_id: number
  from?: ITUser
  sender_chat?: ITChat
  date: number
  chat: ITChat
  reply_to_message?: ITMessage
  via_bot?: ITUser
  edit_date?: number
  has_protected_content?: boolean
  media_group_id?: string
  author_signature?: string
  text?: string
  entities?: ITMessageEntity[]
}