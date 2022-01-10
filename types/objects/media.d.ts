import {ITCaption, ITVideoParams, ITAudioParams, ITMediaCommon } from '../message/send'
import { TTAttachment } from '../objects/file'

export type ITInputMedia = InputMediaAnimation
  | InputMediaDocument
  | InputMediaAudio
  | InputMediaPhoto
  | InputMediaVideo

enum ETInputMediaType {
  Animation = 'animation',
  Document = 'document',
  Audio = 'audio',
  Photo = 'photo',
  Video = 'video'
}
export type ITInputMediaBase = ITCaption & {
  type: ETInputMediaType
  media: TTAttachment
}
export interface ITInputMediaPhoto extends ITInputMediaBase {
  type: ETInputMediaType.Photo
}
export interface ITInputMediaVideo extends ITInputMediaBase, ITMediaCommon, Omit<ITVideoParams,'title'> {
  type: ETInputMediaType.Video
}
export interface ITInputMediaAnimation extends ITInputMediaBase,ITMediaCommon, Omit<ITVideoParams,'title'|'supports_streaming'> {
  type: ETInputMediaType.Animation
}
export interface ITInputMediaAudio extends ITInputMediaBase, ITMediaCommon, ITAudioParams {
  type: ETInputMediaType.Audio
}
export interface ITInputMediaDocument extends ITInputMediaBase {
  type: ETInputMediaType.Document
  thumb?: TTAttachment
  disable_content_type_detection?: boolean
}