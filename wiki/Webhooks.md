# Вебхуки

Вебхуки позволяют получать уведомления о событиях (доставка, открытие, клик, отказ и др.) на ваш сервер. Для управления используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Список вебхуков

```typescript
const webhooks = await client.getWebhooks();

webhooks.Webhooks.forEach((w) => {
  console.log(`${w.ID}: ${w.Url}`);
});
```

### Фильтрация по каналу

```typescript
const webhooks = await client.getWebhooks({
  MessageStream: "outbound",
});
```

## Получение вебхука

```typescript
const webhook = await client.getWebhook(12345);
console.log(webhook.Url, webhook.MessageStream);
```

## Создание вебхука

```typescript
const webhook = await client.createWebhook({
  Url: "https://ваш-сервер.ru/webhooks/haskimail",
  MessageStream: "outbound",
  HttpAuth: {
    Username: "webhook-user",
    Password: "webhook-secret",
  },
  Triggers: {
    Open: { Enabled: true, PostFirstOpenOnly: true },
    Click: { Enabled: true },
    Delivery: { Enabled: true },
    Bounce: { Enabled: true, IncludeContent: true },
    SpamComplaint: { Enabled: true, IncludeContent: true },
  },
});

console.log(`Создан вебхук ID: ${webhook.ID}`);
```

## Редактирование вебхука

```typescript
await client.editWebhook(12345, {
  Url: "https://ваш-сервер.ru/webhooks/v2",
  Triggers: {
    Open: { Enabled: false },
    Click: { Enabled: true },
  },
});
```

## Удаление вебхука

```typescript
await client.deleteWebhook(12345);
```

## Обработка входящих вебхуков

Пример обработки вебхуков на сервере (Express.js):

```typescript
import express from "express";
import { Models } from "haskimail";

const app = express();
app.use(express.json());

app.post("/webhooks/haskimail", (req, res) => {
  const event = req.body;

  switch (event.RecordType) {
    case "Delivery":
      console.log(`Доставлено: ${event.MessageID} -> ${event.Recipient}`);
      break;

    case "Bounce":
      console.log(`Отказ: ${event.Email} — ${event.Type}`);
      break;

    case "Open":
      console.log(`Открытие: ${event.MessageID} от ${event.Recipient}`);
      break;

    case "Click":
      console.log(`Клик: ${event.OriginalLink} от ${event.Recipient}`);
      break;

    case "SpamComplaint":
      console.log(`Спам-жалоба: ${event.Email}`);
      break;
  }

  res.sendStatus(200);
});

app.listen(3000);
```
