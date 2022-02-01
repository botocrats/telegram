import { JSON } from "."
import { ITChatId, ITUserId } from "./chat"

interface ITBotCommand {
  command: string
  description: string
}

type ITBotCommandScopeDefault = {
  type: "default"
};
declare enum ETBotCommandScope {
  Default = '{"type":"default"}',
  AllPrivateChats = '{"type":"all_private_chats"}',
  AllGroupChats = '{"type":"all_group_chats"}',
  AllChatAdministrators = '{"type":"all_chat_administrators"}',
}
interface ITBotCommandScopeChat extends ITChatId {
  type: "chat" | "chat_administrators"
}
interface ITBotCommandScopeChatMember extends ITChatId, ITUserId {
  type: "chat_member"
}

interface ITSetMyCommandParams extends ITGetMyCommandParams {
  commands: JSON<ITBotCommand[]>
}
interface ITGetMyCommandParams {
  scope?:
    | ETBotCommandScope
    | JSON<ITBotCommandScopeChat>
    | JSON<ITBotCommandScopeChatMember>
  language_code?: string
}
export interface ITCommandMethods {
  setMyCommands: (params: ITSetMyCommandParams) => Promise<boolean>
  getMyCommands: (params: ITGetMyCommandParams) => Promise<ITBotCommand[]>
  deleteMyCommands: (params: ITGetMyCommandParams) => Promise<boolean>
}
