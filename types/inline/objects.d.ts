import { ITInlineKeyboardMarkup } from '../message/reply_markup'
import { ITContact, ETParseMode } from '../message/send'
import { ITMessageEntity } from '../message'
import { ITLiveLocation, ITLocationBasic, ITVenueBase } from '../objects/location'
import { ITInvoiceProposal } from '../payment'

// TODO add missing types
export type TTInlineQueryResult = ITInlineQueryResultCachedAudio
| ITInlineQueryResultCachedDocument
| ITInlineQueryResultCachedGif
| ITInlineQueryResultCachedMpeg4Gif
| ITInlineQueryResultCachedPhoto
| ITInlineQueryResultCachedSticker
| ITInlineQueryResultCachedVideo
| ITInlineQueryResultCachedVoice
| ITInlineQueryResultArticle
| ITInlineQueryResultAudio
| ITInlineQueryResultContact
| ITInlineQueryResultGame
| ITInlineQueryResultDocument
| ITInlineQueryResultGif
| ITInlineQueryResultLocation
| ITInlineQueryResultMpeg4Gif
| IInlineQueryResultPhoto
| ITInlineQueryResultVenue
| ITInlineQueryResultVideo
| ITInlineQueryResultVoice

declare enum ETInlineResultType {
  Article = 'article',
  Photo = 'photo'
}

interface ITThumb {
  thumb_url?: string
  thumb_height?: number
  thumb_width?: number
}

interface ITInlineQueryResultArticle extends ITThumb {
  id: string
  type: ETInlineResultType.Article
  input_message_content: TTInputMessageContent
  reply_markup?: ITInlineKeyboardMarkup
  url?: string
  hide_url?: string
  description?: string
}

interface ITInlineQueryResultPhoto {
  id: string
  type: ETInlineResultType.Photo
  input_message_content?: TTInputMessageContent
  reply_markup?: ITInlineKeyboardMarkup
  url?: string
  hide_url?: string
  description?: string
  thumb_url?: string
  thumb_height?: number
  thumb_width?: number
}

interface TTInputTextMessageContent {
  message_text: string
  parse_mode?: ETParseMode
  entities?: ITMessageEntity[]
  disable_web_page_preview?: boolean
}

type TTInputLocationMessageContent = ITLiveLocation
type TTInputVenueMessageContent = ITVenueBase & Required<ITLocationBasic>
type TTInputContactMessageContent = Omit<ITContact, 'user_id'>
type TTInputInvoiceMessageContent = ITInvoiceProposal

export type TTInputMessageContent = TTInputTextMessageContent
  | TTInputLocationMessageContent
  | TTInputVenueMessageContent
  | TTInputContactMessageContent
  | TTInputInvoiceMessageContent