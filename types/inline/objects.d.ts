import { ITInlineKeyboardMarkup } from '../message/reply_markup'
import { ITCaption, ITContact } from "../message/send"
import { TTInputMessageContent } from "./input_message"
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
  Article = "article",
  Photo = "photo",
  GIF = "gif",
  MPEG4GIF = "mpeg4_gif",
  Video = "video",
  Audio = "audio",
  Voice = "voice",
  Document = "document",
  Location = "location",
  Venue = "venue",
  Contact = "contact",
  Game = "game",
  CachedPhoto = "photo"
}

interface ITThumb {
  thumb_url?: string
  thumb_height?: number
  thumb_width?: number
}

interface ITIQRBase {
  type: ETInlineResultType
  id: string
  title?: string
  description?: string
  input_message_content?: TTInputMessageContent
  reply_markup?: ITInlineKeyboardMarkup
}
interface ITInlineQueryResultArticle extends ITIQRBase, ITThumb {
  type: ETInlineResultType.Article
  title: string
  url?: string
  hide_url?: string
  description?: string
}
interface ITInlineQueryResultCachedPhoto extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Photo
  photo_file_id: string
}
interface ITInlineQueryResultPhoto extends Omit<ITInlineQueryResultCachedPhoto, "photo_file_id"> {
  photo_url: string
  thumb_url?: string
  photo_width?: number
  photo_height?: number
}
interface ITInlineQueryResultCachedGif extends Omit<ITIQRBase, "description">, ITCaption {
  type: ETInlineQueryResultType.GIF
  gif_file_id: string // A valid file identifier for the GIF file
} 
interface ITInlineQueryResultGif extends Omit<ITInlineQueryResultCachedPhoto, "gif_file_id">  {
  gif_url: string // A valid URL for the GIF file. File size must not exceed 1MB
  gif_width?: number // Width of the GIF
  gif_height?: number // Height of the GIF
  gif_duration?: number // Duration of the GIF in seconds
  thumb_url: string // URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
  thumb_mime_type?: string // MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”
}
interface ITInlineQueryResultCachedMpeg4Gif extends Omit<ITIQRBase, "description">, ITCaption {
  type: ETInlineQueryResultType.MPEG4GIF 
  mpeg4_file_id: string // A valid file identifier for the MP4 file
}
interface ITInlineQueryResultMpeg4Gif extends Omit<ITInlineQueryResultCachedMpeg4Gif, "mpeg4_file_id"> {
  mpeg4_url: string // A valid URL for the MP4 file. File size must not exceed 1MB
  mpeg4_width?: number // Video width
  mpeg4_height?: number // Video height
  mpeg4_duration?: number // Video duration in seconds
  thumb_url: string // URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
  thumb_mime_type?: string // MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”
}
interface ITInlineQueryResultCachedVideo extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Video
  video_file_id: string // A valid file identifier for the video file
}
interface ITInlineQueryResultVideo extends Omit<ITInlineQueryResultCachedVideo, "video_file_id"> {
  video_url: string // A valid URL for the embedded video player or video file
  mime_type: string // Mime type of the content of video url, “text/html” or “video/mp4”
  thumb_url: string // URL of the thumbnail (JPEG only) for the video
  video_width?: number // Video width
  video_height?: number // Video height
  video_duration?: number // Video duration in seconds
}
interface ITInlineQueryResultCachedVoice extends Omit<ITIQRBase, "description">, ITCaption {
  type: ETInlineQueryResultType.Voice
  voice_file_id: string // A valid file identifier for the voice file
}
interface ITInlineQueryResultVoice extends Omit<ITInlineQueryResultCachedVoice, "voice_file_id"> {
  voice_url: string // A valid URL for the voice recording
  voice_duration?: number // Voice duration in seconds
}
interface ITInlineQueryResultCachedAudio extends Omit<ITIQRBase, "description">, ITCaption {
  type: ETInlineQueryResultType.Audio
  audio_file_id: string // A valid file identifier for the audio file
}
interface ITInlineQueryResultAudio extends Omit<ITInlineQueryResultCachedAudio, "audio_file_id"> {
  audio_url: string // A valid URL for the audio recording
  audio_duration?: number // Audio duration in seconds
  performer?: string // Performer
}
interface ITInlineQueryResultCachedSticker extends Omit<ITIQRBase, "title" | "description"> {
  type: ETInlineQueryResultType.Sticker
  sticker_file_id: string // A valid file identifier of the sticker
}
interface ITInlineQueryResultCachedDocument extends ITIQRBase, ITCaption {
  type: ETInlineQueryResultType.Document
  document_file_id: string // A valid file identifier for the document file
}
interface ITInlineQueryResultDocument extends Omit<ITInlineQueryResultCachedDocument, "document_file_id">, ITThumb {
  document_url: string // A valid URL for the file
  mime_type: string // Mime type of the content of the file, either “application/pdf” or “application/zip”
}
interface ITInlineQueryResultGame {
  id: string
  type: ETInlineQueryResultType.Game
  game_short_name: string
  reply_markup?: ITInlineKeyboardMarkup
}
interface ITInlineQueryResultLocation extends Omit<ITIQRBase, "description">, ITThumb, ITLiveLocation{ 
  type: ETInlineQueryResultType.Location
}
interface ITInlineQueryResultVenue extends Omit<ITIQRBase, "description">, ITThumb, ITVenueBase, Omit<ITLocationBasic, "horizontal_accuracy">{ 
  type: ETInlineQueryResultType.Venue
}
interface ITInlineQueryResultContact extends Omit<ITIQRBase, "title" | "description">, ITThumb, ITContactBase, Omit<ITContact, "user_id">{ 
  type: ETInlineQueryResultType.Contact
}