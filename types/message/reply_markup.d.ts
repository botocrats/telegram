import {ETPollType} from '../objects'

type ITInlineKeyboardButton = {
  text: string
  url: string
} | {
  text: string
  login_url: string 
} | {
  text: string
  callback_data: string 
}
export interface ITInlineKeyboardMarkup {
  inline_keyboard: ITInlineKeyboardButton[][]
}

export interface ITReplyKeyboardMarkup {
  keyboard: {
    text: string
    request_contact?: boolean
    request_location?: boolean
    request_poll?: { type: ETPollType }
  }
  resize_keyboard?: boolean
  one_time_keyboard?: boolean
  input_field_placeholder?: string
  selective?: boolean
}
export interface ITReplyKeyboardRemove{
  remove_keyboard: true
  selective?: boolean
}
export interface ITForceReply{
  force_reply: true
  input_field_placeholder?: string
  selective?: boolean
}

export type ITReplyMarkup = ITInlineKeyboardMarkup | ITReplyKeyboardMarkup | ITReplyKeyboardRemove | ITForceReply