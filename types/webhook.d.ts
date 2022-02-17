import { ITUpdate } from '.'
import { Stream } from 'stream'

type TTUpdateType = keyof ITUpdate
interface ITWebhook {
  url: string
  ip_address?: string
  max_connections?: number
  allowed_updates?: TTUpdateType[] // json
}
export interface ITWebhookInfo extends ITWebhook {
  has_custom_certificate: boolean
  pending_update_count: number
  last_error_date?: number
  last_error_message?: string
}
export interface ITSetWebhookParams extends ITWebhook {
  certificate?: Stream
}
export interface ITWebHookMethods {
  getWebhookInfo: () => Promise<ITWebhookInfo>
  getUpdates: (params: {offset: number, limit?: number, timeout?: number, allowed_updates?: TTUpdateType[]}) => ITUpdate[]
  setWebhook: (params: ITSetWebhookParams) => Promise<void>
  deleteWebhook: () => Promise<true>
}