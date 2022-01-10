import { ITFile, ITPhotoSize, TTAttachment } from './file'
export interface ITAnimation {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  thumb?: ITPhotoSize
  duration: number
  file_name?: string
  mime_type?: string
  file_size?: number
}
interface ITSticker {
  file_id: string
  file_unique_id: string
  width:number
  height:number
  is_animated: boolean
  thumb?: ITPhotoSize
  emoji?: string
  set_name?: string
  mask_position?: ITMaskPosition
  file_size?: number
}
interface ITStickerSet {
  name: string
  title: string
  is_animated: boolean
  stickers: ITSticker[]
  thumb: ITPhotoSize
}
interface ITMaskPosition {
  point: string
  x_shift: number
  y_shift: number
  scale: number
}

export interface ITStickerMethods {
  getStickerSet: (params: {name: string}) => Promise<ITStickerSet>
  uploadStickerFile: (params: { user_id: number, png_sticker: TTAttachment }) => Promise<ITFile>
  createNewStickerSet: (params: ITCreateStickerSetParams) => Promise<boolean>
  addStickerToSet: (params: ITAddToStickerSetParams) => Promise<boolean>
  setStickerPositionInSet: (params: {sticker: string, position: number}) => Promise<boolean>
  deleteStickerFromSet: (params: { sticker: string }) => Promise<boolean>
  setStickerSetThumb: (params: {name: string, user_id: number, thumb: TTAttachment}) => Promise<boolean>
}


interface ITCreateStickerSetParams extends ITAddToStickerSetParams {
  title: string
}
interface ITAddToStickerSetParams {
  user_id: number
  name: string
  png_sticker?:	TTAttachment
  tgs_sticker?: TTAttachment
  emojis: string 
  contains_masks?: boolean
  mask_position?: ITMaskPosition
}