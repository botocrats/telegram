import { TTCurrency } from './currency'
import {ITUser} from '../user'
import {JSON} from '../message/send'

export {TTCurrency}
export interface ITInvoice {
  title: string
  description: string
  start_parameter: string
  currency: TTCurrency
  total_amount: number
}
export interface ITLabeledPrice {
  label: string
  amount: number
}
interface ITShippingAddress {
  country_code: string
  state: string
  city: string
  street_line1: string
  street_line2: string
  post_code: string
}
interface ITOrderInfo {
  name: string
  phone_number: string
  email: string
  shipping_address: ITShippingAddress
}
interface ITShippingOption{
  id: string
  title: string
  prices: ITLabeledPrice[]
}
export interface ITSuccessfulPayment{
  currency: TTCurrency
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: ITOrderInfo
  telegram_payment_charge_id: string
  provider_payment_charge_id: string
}
export interface ITShippingQuery {
  id: string
  from: ITUser
  invoice_payload: string
  shipping_address: ITShippingAddress
}
export interface ITPreCheckoutQuery {
  id: string
  from: ITUser
  currency: TTCurrency
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: ITOrderInfo
}
interface ITAnswerShippingQuerySuccessParams {
  shipping_query_id: string
  ok: true
  shipping_options: ITShippingOption[]
}
interface ITAnswerShippingQueryFailParams {
  shipping_query_id: string
  ok: false
  error_message: string
}
interface ITAnswerPreCheckoutQuerySuccessParams {
  pre_checkout_query_id: string
  ok: true
  shipping_options: ITShippingOption[]
}
interface ITAnswerPreCheckoutQueryFailParams {
  pre_checkout_query_id: string
  ok: false
  error_message: string
}
export interface ITInvoiceProposal{
  title: string
  description: string
  payload: string
  provider_token: string
  currency: TTCurrency
  prices: JSON<ITLabeledPrice[]>
  max_tip_amount?: number
  suggested_tip_amounts?: JSON<number[]>
  start_parameter?: string
  provider_data?: JSON<Object>
  photo_url?: string
  photo_size?: number
  photo_width?: number
  photo_height?: number
  need_name?: boolean
  need_phone_number?: boolean
  need_email?: boolean
  need_shipping_address?: boolean
  send_phone_number_to_provider?: boolean
  send_email_to_provider?: boolean
  is_flexible?: boolean
}
export interface ITPaymentMethods {
  answerShippingQuery: (params: ITAnswerShippingQuerySuccessParams | ITAnswerShippingQueryFailParams)=> Promise<boolean>
  answerPreCheckoutQuery: (params: ITAnswerPreCheckoutQuerySuccessParams | ITAnswerPreCheckoutQueryFailParams)=> Promise<boolean>
}
