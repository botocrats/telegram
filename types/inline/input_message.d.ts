import { ITContact, ETParseMode } from "../message/send";
import { ITMessageEntity } from '../message'
import { ITLiveLocation, ITLocationBasic, ITVenueBase } from '../objects/location'
import { ITInvoiceProposal } from '../payment'

type TTInputLocationMessageContent = ITLiveLocation
type TTInputVenueMessageContent = ITVenueBase & Required<ITLocationBasic>
type TTInputContactMessageContent = Omit<ITContact, "user_id">
type TTInputInvoiceMessageContent = ITInvoiceProposal

interface TTInputTextMessageContent {
  message_text: string
  parse_mode?: ETParseMode
  entities?: ITMessageEntity[]
  disable_web_page_preview?: boolean
}

export type TTInputMessageContent =
  | TTInputTextMessageContent
  | TTInputLocationMessageContent
  | TTInputVenueMessageContent
  | TTInputContactMessageContent
  | TTInputInvoiceMessageContent
