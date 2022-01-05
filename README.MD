# Telegram Client

A fuss-free, light-weight wrapper Telegram Client for Node.js.

Tested Node version: [15.4.0](https://github.com/nodejs/node/releases/tag/v15.4.0).

[Telegram Bot API 5.6](https://core.telegram.org/bots/api#december-30-2021)

## What's the difference?

- You don't have to think about the order of the arguments, same as official API
- Smallest size(< 4 kb)
- Minimal dependencies (request-promise)
- Future-proof (Only types will added on Telegram API changes)
- [Bent](https://github.com/mikeal/bent) as http requester

## Resources

- [Official Telegram Bot API Documentation](https://core.telegram.org/bots/api)

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

### Extra: Download File From Telegram

```typescript
...

const file = await client
  .getFile(incomingMessage.photo)
  .then(client.download) // Buffer

fs.writeFileSync("fileName.ext", file)
...
```

### License

MIT
