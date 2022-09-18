const isStream = require('is-stream') // bent dependency

const hasStream = (key) => (params) => isStream.readable(params[key])

const hasSticker = ({ png_sticker, tgs_sticker, webm_sticker }) =>
  isStream.readable(png_sticker || tgs_sticker || webm_sticker)

const handleMedia = (params) => {
  let anyStream = false;
  params.media.forEach((i, j) => {
    if (isStream.readable(i.media)) {
      anyStream = true
      params['btcrt_file' + j] = i.media
      params.media[j].media = 'attach://btcrt_file' + j
    }
  });
  params.media = JSON.stringify(params.media);
  return anyStream
}
module.exports = {
  sendPhoto: hasStream('photo'),
  setChatPhoto: hasStream('photo'),
  sendAudio: hasStream('audio'),
  sendVideo: hasStream('video'),
  sendVoice: hasStream('voice'),
  sendMediaGroup: handleMedia,
  editMessageMedia: handleMedia,
  sendVideoNote: hasStream('video_note'),
  sendDocument: hasStream('document'),
  sendAnimation: hasStream('animation'),
  sendSticker: hasStream('sticker'),
  setWebHook: hasStream('certificate'),
  setStickerSetThumb: hasStream('thumb'),
  uploadStickerFile: () => true,
  createNewStickerSet: hasSticker, // :)
  addStickerToSet: hasSticker,
}
