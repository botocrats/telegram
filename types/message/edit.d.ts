import { JSON } from '..'
import { ITMessage } from '.'
import { ITChatId } from '../chat'
import { ITReplyMarkup } from './reply_markup'
import { ITCaption, ITText } from './send'
import { TTAttachment } from '../objects'
interface ITEditParameters extends ITChatId {
  message_id?: number
  inline_message_id?: string
  reply_markup?: JSON<ITReplyMarkup>
}

export interface ITEditMethods {
  editMessageText: (params: ITEditParameters & ITText) => Promise<ITMessage>
  editMessageCaption: (params: ITEditParameters & ITCaption) => Promise<ITMessage>
  editMessageMedia: (params: ITEditParameters & { media: TTAttachment }) => Promise<ITMessage>
  editMessageReplyMarkup: (params: ITEditParameters) => Promise<ITMessage>
}