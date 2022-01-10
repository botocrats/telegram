const isStream = require('is-stream') // bent dependency

const hasStream = (key) => (params) => isStream.readable(params[key])

module.exports = {
  sendPhoto: hasStream("photo"),
  setChatPhoto: hasStream("photo"),
  sendAudio: hasStream("audio"),
  sendVideo: hasStream("video"),
  sendVoice: hasStream("voice"),
  sendMediaGroup: (params) => {
    let hasStream = false
    params.media.forEach((i, j) => {
      if (isStream.readable(i.media)) {
        hasStream = true;
        params["btcrt_file" + j] = i.media
        params.media[j].media = "attach://btcrt_file" + j;
      }
    })
    params.media = JSON.stringify(params.media)
    return hasStream
  },
  sendVideoNote: hasStream("video_note"),
  sendDocument: hasStream("document"),
  sendAnimation: hasStream("animation"),
  sendSticker: hasStream("sticker"),
  setWebHook: hasStream("certificate"),
  setStickerSetThumb: hasStream("thumb"),
  uploadStickerFile: () => true,
  createNewStickerSet: ({ png_sticker, tgs_sticker }) =>
    isStream.readable(png_sticker || tgs_sticker),
  addStickerToSet: ({ png_sticker, tgs_sticker }) =>
    isStream.readable(png_sticker || tgs_sticker),
};