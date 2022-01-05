const isStream = require('is-stream') // bent dependency

const hasStream = (key) => (params) => isStream.readable(params[key])

module.exports = {
  sendPhoto: hasStream('photo'),
  setChatPhoto: hasStream('photo'),
  sendAudio: hasStream('audio'),
  sendVideo: hasStream('video'),
  sendVoice: hasStream('voice'),
  sendVideoNote: hasStream('video_note'),
  sendDocument: hasStream('document'),
  sendAnimation: hasStream('animation'),
  sendSticker: hasStream('sticker'),
  setWebHook: hasStream('certificate'),
  setStickerSetThumb: hasStream('thumb'),
  uploadStickerFile: () => true,
  createNewStickerSet: ({ png_sticker, tgs_sticker }) =>
    isStream.readable(png_sticker||tgs_sticker),
  addStickerToSet: ({ png_sticker, tgs_sticker }) =>
    isStream.readable(png_sticker||tgs_sticker),
}