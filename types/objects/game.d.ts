import { ITMessageEntity } from '../message'
import { ITAnimation } from './sticker'
import { ITPhotoSize } from './file'
import { ITUser } from '../user'

interface ITGame {
  title: string
  description: string
  photo: ITPhotoSize[]
  text?: string
  text_entities?: ITMessageEntity[]
  animation?: ITAnimation
}
interface ITSetGameScoreParams {
  user_id: number
  score: number
  force?: boolean
  disable_edit_message?: boolean
  chat_id?: number
  message_id?: number
  inline_message_id?: number
}
interface ITGetGameHighScoresParams {
  user_id: number
  chat_id?: number
  message_id?: number
  inline_message_id?: number
}
interface ITGameHighScore {
  position: number
  user: ITUser
  score: number
}
export interface ITGameMethods {
  setGameScore: (params: ITSetGameScoreParams) => Promise<boolean>
  getGameHighScores: (params: ITGetGameHighScoresParams) => Promise<ITGameHighScore[]>
}