import { ETDiceEmoji, ITMessage, ITMessageEntity } from '.'

import { ITReplyMarkup } from "./reply_markup"
import { ITInvoiceProposal } from "../payment"
import { ITChatId, TTChatIdType } from "../chat"
import { ITLocationBasic, ITLiveLocation, ITVenueBase, ITPoll, ITQuiz, ITInputMedia, TTAttachment } from "../objects"
import { ITEditMethods } from "./edit"

import { JSON } from '..'

type TTLocation = ITLocationBasic | ITLiveLocation
declare enum ETParseMode {
  Markdown='Markdown',
  MarkdownV2=' MarkdownV2',
  HTML=' HTML',
}
export interface ITMediaCommon {
  thumb?: TTAttachment
  duration?: number
}
interface ITSendParameters extends ITChatId {
  disable_notification?: boolean
  protect_content?: boolean
  reply_to_message_id?: number
  allow_sending_without_reply?: boolean
  reply_markup?: JSON<ITReplyMarkup>
}
export interface ITCaption {
  caption?: string
  caption_entities?: JSON<ITMessageEntity[]>
  parse_mode?: ETParseMode
}
export interface ITText {
  text: string
  entities?: JSON<ITMessageEntity[]>
  parse_mode?: ETParseMode
  disable_web_page_preview?: boolean
}
interface ITContact {
  phone_number: string
  first_name: string
  last_name?: string
  user_id?: number
  vcard?: string
}
interface ITForwardMessageParams extends ITChatId {
  from_chat_id: number | string
  disable_notification?: boolean
  protect_content?: boolean
  message_id: number
}
export interface ITVideoParams{
  height?: number
  width?: number
  title?: string
  supports_streaming?: boolean
}
export interface ITAudioParams {
  performer?: string
  title?: string
}
export type ITCopyMessageParams = ITSendParams["Message"] & {from_chat_id: TTChatIdType, message_id: number}
export interface ITSendParams {
  Message: ITSendParameters & ITText
  Dice: ITSendParameters & {
    emoji: ETDiceEmoji
  }
  Game: ITSendParameters & { game_short_name: string }
  Photo: ITSendParameters & ITCaption & {photo: TTAttachment}
  Sticker: ITSendParameters & {sticker: TTAttachment}
  Animation: ITSendParameters & ITCaption & {animation: TTAttachment}
  Audio: ITSendParameters & ITCaption & ITMediaCommon & ITAudioParams & {
    audio: TTAttachment
  }
  Voice: ITSendParameters & ITCaption & {
    voice: TTAttachment
    duration?: number
  }
  Video: ITSendParameters & ITCaption & ITMediaCommon & ITVideoParams & {
    video: TTAttachment
  }
  VideoNote: ITSendParameters & ITMediaCommon & {
    video_note: TTAttachment
    length?: number
  }
  Document: ITSendParameters & ITCaption & {
    document: TTAttachment
    disable_content_type_detection?: boolean
    thumb?: TTAttachment
  }
  Invoice: ITSendParameters & ITInvoiceProposal
  Location: ITSendParameters & TTLocation
  Venue: ITSendParameters & ITVenueBase
  Contact: ITSendParameters & ITContact
  Poll: ITSendParameters & Omit<(ITPoll | ITQuiz), "id">
  MediaGroup: ITSendParameters & { media: ITInputMedia }
}
export interface ITMessageMethods extends ITEditMethods {
  sendMessage: (params: ITSendParams["Message"]) => Promise<ITMessage>
  forwardMessage: (params: ITForwardMessageParams) => Promise<ITMessage>
  copyMessage: (params: ITCopyMessageParams) => Promise<ITMessage>
  sendPhoto: (params: ITSendParams["Photo"]) => Promise<ITMessage>
  sendAudio: (params: ITSendParams["Audio"]) => Promise<ITMessage>
  sendDocument: (params: ITSendParams["Document"]) => Promise<ITMessage>
  sendVideo: (params: ITSendParams["Video"]) => Promise<ITMessage>
  sendAnimation: (params: ITSendParams["Animation"]) => Promise<ITMessage>
  sendVoice: (params: ITSendParams["Voice"]) => Promise<ITMessage>
  sendVideoNote: (params: ITSendParams["VideoNote"]) => Promise<ITMessage>
  sendMediaGroup: (params: ITSendParams["MediaGroup"]) => Promise<ITMessage[]>
  sendLocation: (params: ITSendParams["Location"]) => Promise<ITMessage>
  sendVenue: (params: ITSendParams["Venue"]) => Promise<ITMessage>
  sendContact: (params: ITSendParams["Contact"]) => Promise<ITMessage>
  sendPoll: (params: ITSendParams["Poll"]) => Promise<ITMessage>
  sendDice: (params: ITSendParams["Dice"]) => Promise<ITMessage>
  sendSticker: (params: ITSendParams["Sticker"]) => Promise<ITMessage>
  sendInvoice: (params: ITSendParams["Invoice"]) => Promise<ITMessage>
  sendGame: (params: ITSendParams["Game"]) => Promise<ITMessage>
}
