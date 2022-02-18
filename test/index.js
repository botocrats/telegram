/* eslint-disable no-undef */
const createClient = require('../src')
const fs = require('fs')

if (!process.env.BOT_TOKEN) {
  console.log(
    '\n\nError!\nPlease provide bot token by environment variable. export BOT_TOKEN=123456789:BB...\n\n\n\n'
  )
  process.exit(1)
}
if (!process.env.TEST_CHAT_ID) {
  console.log(
    '\n\nError!\nPlease provide TEST_CHAT_ID by environment variable. export TEST_CHAT_ID=-12232\n\n\n\n'
  )
  process.exit(1)
}
const chat_id = process.env.TEST_CHAT_ID
const file_id = 'AgACAgQAAx0ESTL-FQACARdh-b9i4dboNlj6-j31Gf7x8vHhnQACeLcxG5nl0VPx5i_9jRdB_wEAAwIAA3kAAyME'
const client = createClient({
  token: process.env.BOT_TOKEN,
  debug: (err) => console.log(err)
})
const photoStream = fs.createReadStream(__dirname + '/file.jpg')
let test = (module.exports = {
  me: client
    .getMe()
    .then((me) => (me.is_bot === true ? true : Promise.reject())),
  sendPhotoByFileId: () =>
    client
      .sendPhoto({
        chat_id,
        photo: file_id,
      })
      .then((e) =>
        e.photo && e.photo instanceof Array
          ? true
          : Promise.reject('Should sent photo')
      ),
  download: () =>
    client
      .getFile({file_id})
      .then(client.download)
      .then(([buffer, ext, size]) => {
        fs.writeFileSync(__dirname + '/file.' + ext, buffer)
        return true
      }),
  uploadPhoto: () =>
    client
      .sendPhoto({
        chat_id,
        photo: photoStream,
      })
      .then((e) => 
        e.photo && e.photo instanceof Array
          ? true
          : Promise.reject('Should upload photo')),
  interceptor: () => new Promise((resolve, reject)=>{ 
    const client2 = createClient({
      token: process.env.BOT_TOKEN,
      debug: (err) => console.log(err),
      interceptor: (method, params) => {
        (method === 'getMe')
          ? resolve()
          : reject()
      }
    })
    client2.getMe()
  }),
  interceptorIntervention: () => {
    const client2 = createClient({
      token: process.env.BOT_TOKEN,
      debug: (err) => console.log(err, 2),
      interceptor: async (method, params) => ({ username: 'test' })
    })
    return client2.getMe()
      .then((res) => {
        res.username === 'test'
          ? true
          : Promise.reject(false)
      })
  },
  uploadMediaGroup: async () =>
    client
      .sendMediaGroup({
        chat_id,
        media: [
          {
            type: 'photo',
            media: photoStream,
            caption: 'Atatürk',
          },
          {
            type: 'photo',
            media: photoStream,
          },
        ],
      })
      .then((e) =>
        e instanceof Array && e[0].media_group_id
          ? true
          : Promise.reject('Should upload media group')
      )
})
