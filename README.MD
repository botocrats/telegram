# Telegram Bot Client

Simple, light-weight Telegram Bot Client for Node.js.

[![NodeJS][nodejs-image]][npm-url]
[![npm][npm-image]][npm-url]
[![telegram 5.7][telegram-image]][telegram-url]
[![size][size-image]][npm-url]
[![quality][quality-image]][npm-url]
[![last commit][lastcommit-image]][github-url]
[![license mit][license-image]][github-url]
![vulnerabilities][vulnerabilities-image]

## What's the difference?

- You don't have to think about the order of the arguments, same as official API
- Smallest size(< 5 kb)
- Minimal dependencies
- Future-proof (Only types will added on Telegram API changes)
- [Bent][bent-url] as http requester

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

- [Official Telegram Bot API Documentation][telegram-url]

### License

MIT License



[license-image]: https://img.shields.io/github/license/botocrats/telegram?style=flat-square
[size-image]: https://img.shields.io/bundlephobia/minzip/@botocrat/telegram?style=flat-square
[quality-image]: https://img.shields.io/npms-io/quality-score/@botocrat/telegram?style=flat-square
[nodejs-image]: https://img.shields.io/badge/library-NodeJS-darkgreen.svg?style=flat-square
[telegram-image]: https://img.shields.io/badge/telegram%20bot%20api-5.7-00aced.svg?style=flat-square&logo=telegram
[npm-image]: https://img.shields.io/npm/v/@botocrat/telegram.svg?style=flat-square
[lastcommit-image]: https://img.shields.io/github/last-commit/botocrats/telegram?style=flat-square
[vulnerabilities-image]: https://img.shields.io/snyk/vulnerabilities/npm/@botocrat/telegram

[telegram-url]: https://core.telegram.org/bots/api#january-31-2022
[npm-url]: https://npmjs.org/package/@botocrat/telegram
[github-url]: https://github.com/botocrats/telegram
[bent-url]: https://github.com/mikeal/bent
