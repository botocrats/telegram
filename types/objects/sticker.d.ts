import { JSON } from '..'
import { ITFile, ITPhotoSize, TTAttachment } from './file'

export interface ITAnimation {
  file_id: string // Identifier for this file, which can be used to download or reuse the file
  file_unique_id: string // Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
  width: number // Video width as defined by sender
  height: number // Video height as defined by sender
  thumb?: ITPhotoSize // Duration of the video in seconds as defined by sender
  duration: number // Animation thumbnail as defined by sender
  file_name?: string // Original animation filename as defined by sender
  mime_type?: string // MIME type of the file as defined by sender
  file_size?: number // File size in bytes
}

interface ITSticker {
  file_id: string // Identifier for this file, which can be used to download or reuse the file
  file_unique_id: string  // Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
  width: number // Sticker width
  height: number // Sticker height
  is_animated: boolean // True, if the sticker is animated
  is_video: boolean // True, if the sticker is a video sticker
  thumb?: ITPhotoSize // Sticker thumbnail in the .WEBP or .JPG format
  emoji?: string // Emoji associated with the sticker
  set_name?: string // Name of the sticker set to which the sticker belongs
  mask_position?: JSON<ITMaskPosition>  // For mask stickers, the position where the mask should be placed
  file_size?: number // File size in bytes
}

interface ITStickerSet {
  name: string // Sticker set name
  title: string // Sticker set title
  is_animated: boolean // True, if the sticker set contains animated stickers
  is_video: boolean // True, if the sticker set contains video stickers
  contains_masks: boolean // True, if the sticker set contains masks
  stickers: ITSticker[] // List of all set stickers
  thumb?: ITPhotoSize // Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format
}

interface ITMaskPosition {
  point: string // The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”.
  x_shift: number // Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.
  y_shift: number // Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.
  scale: number // Mask scaling coefficient. For example, 2.0 means double size.
}

export interface ITStickerMethods {
  getStickerSet: (params: {name: string}) => Promise<ITStickerSet>
  uploadStickerFile: (params: { user_id: number, png_sticker: TTAttachment }) => Promise<ITFile>
  createNewStickerSet: (params: ITCreateStickerSetParams) => Promise<boolean>
  addStickerToSet: (params: ITAddStickerToSetParams) => Promise<boolean>
  setStickerPositionInSet: (params: {sticker: string, position: number}) => Promise<boolean>
  deleteStickerFromSet: (params: { sticker: string }) => Promise<boolean>
  setStickerSetThumb: (params: {name: string, user_id: number, thumb: TTAttachment}) => Promise<boolean>
}

interface ITCreateStickerSetParams extends ITAddStickerToSetParams {
  title: string // Sticker set title, 1-64 characters
  constains_mask?: boolean // Pass True, if a set of mask stickers should be created
}

interface ITAddStickerToSetParams {
  user_id: number // User identifier of sticker set owner
  name: string // Sticker set name
  png_sticker?: TTAttachment // PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More info on Sending Files »
  tgs_sticker?: TTAttachment // TGS animation with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#animated-sticker-requirements for technical requirements
  webm_sticker?: TTAttachment // WEBM video with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#video-sticker-requirements for technical requirements
  emojis: string // One or more emoji corresponding to the sticker
  mask_position?: JSON<ITMaskPosition> //  A JSON-serialized object for position where the mask should be placed on faces
}
