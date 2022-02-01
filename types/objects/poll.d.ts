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
  id: string // Unique poll identifier
  question: string // Poll question, 1-300 characters
  options: ITPollOption[] // List of poll options
  total_voter_count: number // Total number of users that voted in the poll
  is_closed: boolean // True, if the poll is closed
  is_anonymous: boolean // True, if the poll is anonymous
  type: ETPollType // poll: regular, quiz: quiz
  allows_multiple_answers: boolean // True, if the poll allows multiple answers
  open_period?: number // Amount of time in seconds the poll will be active after creation
  close_date?: number // Point in time (Unix timestamp) when the poll will be automatically closed
}

interface ITQuiz extends ITPoll {
  type: ETPollType.Quiz
  correct_option_id: number // 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.
  explanation?: string // Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters
  explanation_entities?: JSON<ITMessageEntity[]> // Special entities like usernames, URLs, bot commands, etc. that appear in the explanation
}


