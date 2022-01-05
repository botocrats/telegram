import {ITUpdate} from '.'
import {Stream} from 'stream'

type TTUpdateType = keyof ITUpdate

interface ITSetWebhookParams{
    url: string
    certificate?: Stream
    ip_address?: string
    max_connections?: number
    allowed_updates?: TTUpdateType[] // json
}

export interface ITWebHookMethods {
    getWebhookInfo: () => Promise<any>
    getUpdates: (params: {offset: number, limit?: number, timeout?: number, allowed_updates?: TTUpdateType[]}) => ITUpdate[]
    setWebhook: (params: ITSetWebhookParams) => Promise<void>
    deleteWebhook: (optionalParams) => Promise<void>
}