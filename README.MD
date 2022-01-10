# Telegram Bot Client

Simple, light-weight Telegram Bot Client for Node.js.

Tested Node version: [15.4.0](https://github.com/nodejs/node/releases/tag/v15.4.0).


[![npm version](https://badge.fury.io/js/@botocrat%2Ftelegram.svg)](https://npmjs.com/package/@botocrat/telegram) [Telegram Bot API 5.6](https://core.telegram.org/bots/api#december-30-2021)

## What's the difference?

- You don't have to think about the order of the arguments, same as official API
- Smallest size(< 5 kb)
- Minimal dependencies
- Future-proof (Only types will added on Telegram API changes)
- [Bent](https://github.com/mikeal/bent) as http requester

## Getting started

```bash
npm i @botocrat/telegram --save
```

```javascript
import createClient from '@botocrat/telegram'

const client = createClient({token: '123456789:BB...'})

const me = await client.getMe()

```

### TypeScript Support

```typescript
import createClient, {ITMessage} from '@botocrat/telegram'

const client = createClient({token: '123456789:BB...'})

const Message: ITMessage = {chat_id: -11111111, text: "Hello", protect_content: true}
const sent = await client.sendMessage(Message)

```

### Extra Feature: Download File From Telegram

```typescript
...

const [data, ext, size] = await client
  .getFile(incomingMessage.photo)
  .then(client.download) // Buffer

fs.writeFileSync("fileName." + ext, data)
...
```

## Client options

| Param | Description | Default |
|-|-|-|
| token | Telegram bot token | *Required* |
| debug | Debug function | () => void|
| baseUri | Telegram API url | _https://api.telegram.org_ |
| fileSizeLimit | Size limiter for .download() method | Infinity (no limit) |

No need for extra documentation, methods and parameters explained in Official Telegram Bot API Documentation

## Resources

- [Official Telegram Bot API Documentation](https://core.telegram.org/bots/api)

### License

MIT
