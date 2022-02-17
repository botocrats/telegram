import { JSON } from '..'
import { ITMessageEntity } from '../message'
import { ITUser } from '../user'

export enum ETPollType {
  Default = 'regular',
  Quiz = 'quiz',
  Regular = 'regular'
}

interface ITPollOption {
  text: string
  voter_count: number
}

export interface ITPollAnswer {
  poll_id: string
  user: ITUser
  option_ids: number[]
}

export interface ITPoll {
  id: string
  question: string
  options: ITPollOption[]
  total_voter_count: number
  is_closed: boolean
  is_anonymous: boolean
  type: ETPollType
  allows_multiple_answers: boolean
  open_period?: number
  close_date?: number
}

interface ITQuiz extends ITPoll {
  type: ETPollType.Quiz
  correct_option_id: number
  explanation?: string 
  explanation_entities?: JSON<ITMessageEntity[]>
}


