/// <reference types="node"/>
import {ETDiceEmoji, ITMessage, ITMessageEntity} from '.'
import { ReadStream } from "fs"
import { ITReplyMarkup } from "./reply_markup"
import { ITInvoiceProposal} from "../payment"
import { ITChatId } from "../chat"
import { ITLocationBasic,ITLiveLocation, ITVenueBase } from "../objects/location"
import { ITEditMethods } from "./edit"
import {TTChatIdType} from '../../../core/types/context'
export type TTAttachmentType = ReadStream | string
type TTLocation = ITLocationBasic | ITLiveLocation
type TTParseMode = "Markdown" | "MarkdownV2" | "HTML"
type JSON<T> = string | T
interface ITMediaCommon {
  thumb?: TTAttachmentType
  duration?: number
}
interface ITSendParameters extends ITChatId{
  disable_notification?: boolean
  reply_to_message_id?: number
  allow_sending_without_reply?: boolean
  reply_markup?: ITReplyMarkup
  protect_content?: boolean
}
export interface ITCaption {
  caption?: string
  captionEntities?: ITMessageEntity[]
  parse_mode?: "Markdown" | "MarkdownV2"
}
export interface ITText {
  text: string
  entities?: ITMessageEntity[]
  parse_mode?: TTParseMode
  disable_web_page_preview?: boolean
}
interface ITContact {
  phone_number: string
  first_name: string
  last_name?: string
  user_id?: number
  vcard?: string
}
interface ITForwardMessageParams extends ITChatId{
  from_chat_id: number | string
  disable_notification?: boolean
  protect_content?: boolean
  message_id: number
}
export type ITCopyMessageParams = ITSendParams["Message"] & {from_chat_id: TTChatIdType, message_id: number}
export interface ITSendParams{
  Message: ITSendParameters & ITText
  Dice: ITSendParameters & {
    emoji: ETDiceEmoji
  }
  Game: ITSendParameters & { game_short_name: string }
  Photo: ITSendParameters & ITCaption & {photo: TTAttachmentType}
  Sticker: ITSendParameters & {sticker: TTAttachmentType}
  Animation: ITSendParameters & ITCaption & {animation: TTAttachmentType}
  Audio: ITSendParameters & ITCaption & ITMediaCommon & {
    audio: TTAttachmentType
    performer?: string
    title?: string
  }
  Voice: ITSendParameters & ITCaption & {
    voice: TTAttachmentType
    duration?: number
  }
  Video: ITSendParameters & ITCaption & ITMediaCommon & {
    video: TTAttachmentType
    height?: number
    width?: number
    title?: string
    supports_streaming?: boolean
  }
  VideoNote: ITSendParameters & ITMediaCommon & {
    video_note: TTAttachmentType
    length?: number
  }
  Document: ITSendParameters & {
    document: TTAttachmentType
    caption?: string
    captionEntities?: ITMessageEntity[]
    thumb?: TTAttachmentType
  }
  Invoice: ITSendParameters & ITInvoiceProposal
  Location: ITSendParameters & ITLiveLocation & {
    live_period?: number
  }
  Venue: ITSendParameters & ITVenueBase
  Contact: ITSendParameters & ITContact
}
export interface ITMessageMethods extends ITEditMethods{
  sendMessage: (params: ITSendParams["Message"]) => Promise<ITMessage>
  sendDice: (params: ITSendParams["Dice"]) => Promise<ITMessage>
  sendLocation: (params: ITSendParams["Location"]) => Promise<ITMessage>
  sendVenue: (params: ITSendParams["Venue"]) => Promise<ITMessage>
  sendGame: (params: ITSendParams["Game"]) => Promise<ITMessage>
  sendPhoto: (params: ITSendParams["Photo"]) => Promise<ITMessage>
  sendVideoNote: (params: ITSendParams["VideoNote"]) => Promise<ITMessage>
  sendVoice: (params: ITSendParams["Voice"]) => Promise<ITMessage>
  sendSticker: (params: ITSendParams["Sticker"]) => Promise<ITMessage>
  sendAnimation: (params: ITSendParams["Animation"]) => Promise<ITMessage>
  sendAudio: (params: ITSendParams["Audio"]) => Promise<ITMessage>
  sendVideo: (params: ITSendParams["Video"]) => Promise<ITMessage>
  sendDocument: (params: ITSendParams["Document"]) => Promise<ITMessage>
  sendContact: (params: ITSendParams["Contact"]) => Promise<ITMessage>
  sendInvoice: (params: ITSendParams["Invoice"]) => Promise<ITMessage>
  copyMessage: (params: ITCopyMessageParams) => Promise<ITMessage>
  forwardMessage: (params: ITForwardMessageParams) => Promise<ITMessage>
}
