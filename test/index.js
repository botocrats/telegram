const createClient = require("../src");
const fs = require("fs");

if (!process.env.BOT_TOKEN) {
  console.log(
    "\n\nError!\nPlease provide bot token by environment variable. export BOT_TOKEN=123456789:BB...\n\n\n\n"
  );
  process.exit(1);
}
if (!process.env.TEST_CHAT_ID) {
  console.log(
    "\n\nError!\nPlease provide TEST_CHAT_ID by environment variable. export TEST_CHAT_ID=-12232\n\n\n\n"
  );
  process.exit(1);
}
const chat_id = process.env.TEST_CHAT_ID

const client = createClient({
  token: process.env.BOT_TOKEN,
  debug: (err)=>console.log(err)
});
const photoStream = fs.createReadStream(__dirname + "/file.jpg")
let test = (module.exports = {
  me: client
    .getMe()
    .then((me) => (me.is_bot === true ? true : Promise.reject())),
  sendPhotoByFileId: () =>
    client
      .sendPhoto({
        chat_id,
        photo:
          "AgACAgQAAx0CSTL-FQADp2HbVIFNUHAsLOG0G9fKpI941YZ4AALcvTEbuNXYUr7v8WP1OAWTAQADAgADeQADIwQ",
      })
      .then((e) =>
        e.photo && e.photo instanceof Array
          ? true
          : Promise.reject("Should sent photo")
      ),
  download: () =>
    client
      .getFile({
        file_id:
          "AgACAgQAAx0CSTL-FQADp2HbVIFNUHAsLOG0G9fKpI941YZ4AALcvTEbuNXYUr7v8WP1OAWTAQADAgADeQADIwQ",
      })
      .then(client.download)
      .then(([buffer, ext, size]) => {
        fs.writeFileSync(__dirname + "/file." + ext, buffer);
        return true;
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
          : Promise.reject("Should upload photo")
      ),
  uploadMediaGroup: async () =>
    client
      .sendMediaGroup({
        chat_id,
        media: [
          {
            type: "photo",
            media: photoStream,
            caption: "Atatürk",
          },
          {
            type: "photo",
            media: photoStream,
          },
        ],
      })
      .then((e) =>
        e instanceof Array && e[0].media_group_id
          ? true
          : Promise.reject("Should upload media group")
      ),
});