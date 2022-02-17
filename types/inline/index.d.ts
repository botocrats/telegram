import { ITUser } from '../user'
import { ITLocationBasic } from '../objects'
import { TTInlineQueryResult } from './objects'

export interface ITInlineQuery {
  id: string
  from: ITUser
  location?: ITLocationBasic
  query: string
  offset: string
}
export interface ITAnswerInlineQueryParameters {
  inline_query_id: string
  results: TTInlineQueryResult[]
  cache_time: number
  is_personal?: boolean
  next_offset?: string
  switch_pm_text?: string
  switch_pm_parameter?: string
}
export type TTAnswerInlineQueryMethod = (params: ITAnswerInlineQueryParameters) => Promise<true>
export interface ITChosenInlineResult {
  result_id: string
  from: ITUser
  location: ITLocationBasic
  inline_message_id?: string
  query?: string
}
export { TTInlineQueryResult }