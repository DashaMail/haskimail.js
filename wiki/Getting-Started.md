# Начало работы

## Предварительные требования

1. Зарегистрируйтесь в [Haskimail](https://haskimail.ru)
2. Получите серверный API-токен в настройках сервера
3. Подтвердите подпись отправителя или домен

## Установка

```bash
npm install haskimail
```

## Отправка первого письма

### ES Modules (TypeScript / ESM)

```typescript
import { ServerClient } from "haskimail";

const client = new ServerClient("ваш-серверный-токен");

async function main() {
  const result = await client.sendEmail({
    From: "sender@ваш-домен.ru",
    To: "recipient@example.com",
    Subject: "Привет из Haskimail!",
    HtmlBody: "<h1>Привет!</h1><p>Это тестовое письмо.</p>",
    TextBody: "Привет! Это тестовое письмо.",
  });

  console.log(`Письмо отправлено! MessageID: ${result.MessageID}`);
}

main().catch(console.error);
```

### CommonJS (Node.js)

```javascript
const { ServerClient } = require("haskimail");

const client = new ServerClient("ваш-серверный-токен");

client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Привет из Haskimail!",
  HtmlBody: "<h1>Привет!</h1>",
  TextBody: "Привет!",
}).then(result => {
  console.log(`Письмо отправлено! MessageID: ${result.MessageID}`);
}).catch(error => {
  console.error("Ошибка:", error.message);
});
```

## Документация

- **Wiki** — вы здесь, практическое руководство с примерами
- **[API-справочник](https://dashamail.github.io/haskimail.js/)** — автосгенерированная документация TypeDoc
- **[Документация API Haskimail](https://haskimail.ru/developer)** — описание REST API
