type TErrorType = "BOT_NOT_STARTED" | "BOT_BLOCKED" | "MESSAGE_DELETED"

export interface IAPIError {
  ok: false
  type: TErrorType
  description: string
  error_code: number
}
export type IAPIResult<Obj> = IAPIError | Obj