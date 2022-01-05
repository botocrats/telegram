const createClient = require("./src");

if (!process.env.BOT_TOKEN) {
  console.log(
    "\n\nError!\nPlease provide bot token by environment variable. BOT_TOKEN=123456789:BB...\n\n\n\n"
  );
  process.exit(1);
}
const client = createClient({
  token: process.env.BOT_TOKEN,
});
module.exports = {
  me: client
    .getMe()
    .then((me) => (me.is_bot === true ? true : Promise.reject())),
};
