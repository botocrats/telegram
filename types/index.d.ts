import { ITChatMethods, ITChatJoinRequest, ITChatMemberUpdated } from './chat'
import { ITMessage, ITMessageMethods } from './message'
import { ITStickerMethods } from './objects/sticker'
import { ITPreCheckoutQuery, ITShippingQuery, ITPaymentMethods, ITInvoice, ITSuccessfulPayment } from './payment'
import { ITGameMethods } from './objects/game'
import { ITPoll, ITPollAnswer } from './objects/poll'
import { ITInlineQuery, TTAnswerInlineQueryMethod } from './inline'
import { ITCommandMethods } from './commands'
import { ITWebHookMethods } from './webhook'
import { ITLocationMethods, ITProximityAlertTriggered } from './objects/location'
import { ITFileMethods, ITPhotoSize } from './objects/file'
import { ITMe, ITUser } from './user'

export interface ITClientOptions {
  token: string
  baseUri?: string // default: 'https://api.telegram.org'
  fileSizeLimit?: number // default: Infinity
  debug?: (error: {}) => void // default: false
}
export interface ITAnswerCallbackQueryParams {
  callback_query_id: string
  text?: string
  show_alert?: boolean
  url?: string
  cache_time?: number
}

export interface ITCallbackQuery {
  id: string
  from: ITUser
  message?: ITMessage
  inline_message_id?: number
  chat_instance: string
  data?: string
  game_short_name?: string
}
export interface ITUpdate {
  update_id: number
  message?: ITMessage
  channel_post?: ITMessage
  edited_message?: ITMessage
  edited_channel_post?: ITMessage
  inline_query?: ITInlineQuery
  chosen_inline_result?: ITInlineQuery
  callback_query?: ITCallbackQuery
  shipping_query?: ITShippingQuery
  pre_checkout_query?: ITPreCheckoutQuery
  poll?: ITPoll
  poll_answer?: ITPollAnswer
  my_chat_member?: ITChatMemberUpdated
  chat_member?: ITChatMemberUpdated
  chat_join_request?: ITChatJoinRequest
}
type JSON<T> = string | T

export interface ITServiceMessage {
  new_chat_members: ITUser[]
  left_chat_member: ITUser
  new_chat_title:string
  new_chat_photo:ITPhotoSize[]
  delete_chat_photo: true
  group_chat_created: true
  supergroup_chat_created: true
  channel_chat_created: true
  message_auto_delete_timer_changed: {message_auto_delete_time: number}
  migrate_to_chat_id: number
  migrate_from_chat_id: number
  pinned_message: ITMessage
  invoice: ITInvoice
  successful_payment: ITSuccessfulPayment
  proximity_alert_triggered: ITProximityAlertTriggered
  voice_chat_scheduled: {start_date: number}
  voice_chat_started: {}
  voice_chat_ended: {duration: number}
  voice_chat_participants_invited: {users: ITUser}
}

export interface ITelegramClient extends ITChatMethods, ITStickerMethods, ITGameMethods, ITMessageMethods, ITPaymentMethods, ITCommandMethods, ITWebHookMethods, ITLocationMethods, ITFileMethods {
  getMe: () => Promise<ITMe>
  logOut: () => Promise<void>
  close: () => Promise<void>
  answerCallbackQuery: (params: ITAnswerCallbackQueryParams) => Promise<void>
  answerInlineQuery: TTAnswerInlineQueryMethod
}
export { ITInlineQuery, ITMessage}
export { ITSendParams, ITCopyMessageParams } from './message/send'

declare const createTelegramClient: (options?: ITClientOptions) => ITelegramClient
export default createTelegramClient
