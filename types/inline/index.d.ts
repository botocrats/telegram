import { ITUser } from '../user'
import { ITLocationBasic } from '../objects/location'
import { TTInlineQueryResult } from './objects'

export interface ITInlineQuery {
  id: string
  from: ITUser
  location?: ITLocationBasic
  query: string
  offset: string
}
interface ITAnswerInlineQueryParameters{
  inline_query_id: string
  results: TTInlineQueryResult[]
  cache_time: number
  is_personal?: boolean
  next_offset?: string
  switch_pm_text?: string
  switch_pm_parameter?: string
}
export type TTAnswerInlineQueryMethod = (params: ITAnswerInlineQueryParameters) => Promise<void>
