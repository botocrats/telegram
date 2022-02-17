import { ITInlineKeyboardMarkup } from '../message/reply_markup'
import { ITCaption, ITContact } from '../message/send'
import { TTInputMessageContent } from './input_message'
import { ITLiveLocation, ITLocationBasic, ITVenueBase } from '../objects'

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
  | ITInlineQueryResultPhoto
  | ITInlineQueryResultVenue
  | ITInlineQueryResultVideo
  | ITInlineQueryResultVoice

declare enum ETInlineQueryResultType {
  Article = 'article',
  Photo = 'photo',
  GIF = 'gif',
  MPEG4GIF = 'mpeg4_gif',
  Video = 'video',
  Audio = 'audio',
  Voice = 'voice',
  Document = 'document',
  Location = 'location',
  Venue = 'venue',
  Contact = 'contact',
  Game = 'game',
  CachedPhoto = 'photo',
  Sticker = 'sticker'
}

interface ITThumb {
  thumb_url?: string
  thumb_height?: number
  thumb_width?: number
}

interface ITIQRBase {
  type: ETInlineQueryResultType
  id: string
  title?: string
  description?: string
  input_message_content?: TTInputMessageContent
  reply_markup?: ITInlineKeyboardMarkup
}
interface ITInlineQueryResultArticle extends ITIQRBase, ITThumb {
  type: ETInlineQueryResultType.Article
  title: string
  url?: string
  hide_url?: string
  description?: string
}
interface ITInlineQueryResultCachedPhoto extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Photo
  photo_file_id: string
}
interface ITInlineQueryResultPhoto extends Omit<ITInlineQueryResultCachedPhoto, 'photo_file_id'> {
  photo_url: string
  thumb_url?: string
  photo_width?: number
  photo_height?: number
}
interface ITInlineQueryResultCachedGif extends Omit<ITIQRBase, 'description'>, ITCaption {
  type: ETInlineQueryResultType.GIF
  gif_file_id: string 
} 
interface ITInlineQueryResultGif extends Omit<ITInlineQueryResultCachedPhoto, 'gif_file_id'>  {
  gif_url: string
  gif_width?: number
  gif_height?: number
  gif_duration?: number
  thumb_url: string 
  thumb_mime_type?: string
}
interface ITInlineQueryResultCachedMpeg4Gif extends Omit<ITIQRBase, 'description'>, ITCaption {
  type: ETInlineQueryResultType.MPEG4GIF 
  mpeg4_file_id: string
}
interface ITInlineQueryResultMpeg4Gif extends Omit<ITInlineQueryResultCachedMpeg4Gif, 'mpeg4_file_id'> {
  mpeg4_url: string 
  mpeg4_width?: number
  mpeg4_height?: number
  mpeg4_duration?: number
  thumb_url: string
  thumb_mime_type?: string
}
interface ITInlineQueryResultCachedVideo extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Video
  video_file_id: string
}
interface ITInlineQueryResultVideo extends Omit<ITInlineQueryResultCachedVideo, 'video_file_id'> {
  video_url: string
  mime_type: string
  thumb_url: string
  video_width?: number
  video_height?: number
  video_duration?: number
}
interface ITInlineQueryResultCachedVoice extends Omit<ITIQRBase, 'description'>, ITCaption {
  type: ETInlineQueryResultType.Voice
  voice_file_id: string
}
interface ITInlineQueryResultVoice extends Omit<ITInlineQueryResultCachedVoice, 'voice_file_id'> {
  voice_url: string
  voice_duration?: number
}
interface ITInlineQueryResultCachedAudio extends Omit<ITIQRBase, 'description'>, ITCaption {
  type: ETInlineQueryResultType.Audio
  audio_file_id: string 
}
interface ITInlineQueryResultAudio extends Omit<ITInlineQueryResultCachedAudio, 'audio_file_id'> {
  audio_url: string
  audio_duration?: number
  performer?: string
}
interface ITInlineQueryResultCachedSticker extends Omit<ITIQRBase, 'title' | 'description'> {
  type: ETInlineQueryResultType.Sticker
  sticker_file_id: string
}
interface ITInlineQueryResultCachedDocument extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Document
  document_file_id: string
}
interface ITInlineQueryResultDocument extends Omit<ITInlineQueryResultCachedDocument, 'document_file_id'>, ITThumb {
  document_url: string
  mime_type: string
}
interface ITInlineQueryResultGame {
  id: string
  type: ETInlineQueryResultType.Game
  game_short_name: string
  reply_markup?: ITInlineKeyboardMarkup
}
interface ITInlineQueryResultLocation extends Omit<ITIQRBase, 'description'>, ITThumb, ITLiveLocation{ 
  type: ETInlineQueryResultType.Location
}
interface ITInlineQueryResultVenue extends Omit<ITIQRBase, 'description' | 'title'>, ITThumb, ITVenueBase, Omit<ITLocationBasic, 'horizontal_accuracy'>{ 
  type: ETInlineQueryResultType.Venue
}
interface ITInlineQueryResultContact extends Omit<ITIQRBase, 'title' | 'description'>, ITThumb, ITContact, Omit<ITContact, 'user_id'>{ 
  type: ETInlineQueryResultType.Contact
}