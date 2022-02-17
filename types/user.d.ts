import { ETLanguageCode} from './iso639-1'

export interface ITUser {
  id: number   
  is_bot: boolean
  first_name: string 
  last_name?: string 
  username?: string
  language_code: ETLanguageCode
}

export interface ITMe extends Omit<ITUser, 'language_code'> {
  can_join_group: boolean
  can_read_all_group_messages: boolean
  supports_inline_queries: boolean
  is_bot: true
}