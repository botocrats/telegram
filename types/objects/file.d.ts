import { Buffer } from '@types/node'
import { ReadStream } from 'fs'
type TInputFile = ReadStream
export type TTAttachment = TInputFile | string
export interface ITFile {
  file_id: string
  file_unique_id: string
  file_size?: TFileSize
}

export interface ITPhotoSize extends ITFile {
  width: number
  height: number
}
export interface ITChatPhoto {
  small_file_id: string // 160x160
  small_file_unique_id: string
  big_file_id: string // 640x640
  big_file_unique_id: string
}
interface ITUserProfilePhotos {
  total_count: number
  photos: ITPhotoSize[]
}

type TTFileInfo = ITFile & {file_path: string}

type TFileExtension = string
type TFileSize = number
export interface ITFileMethods {
  getUserProfilePhotos: (params: {user_id: number, offset?: number, limit?: number}) => Promise<ITUserProfilePhotos>
  getFile: (params: { fileId: string }) => Promise<TTFileInfo>
  download: (params: TTFileInfo) => [Buffer, TFileExtension, TFileSize]
}