# Отправка писем

Для отправки писем используется `ServerClient` с серверным API-токеном.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Простое письмо

```typescript
const result = await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Тема письма",
  HtmlBody: "<h1>Привет!</h1><p>Текст письма в HTML</p>",
  TextBody: "Привет! Текст письма.",
});

console.log(result.MessageID); // ID отправленного письма
```

## Отправка с тегом

Теги позволяют категоризировать письма для удобной фильтрации в статистике.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Подтверждение заказа",
  HtmlBody: "<p>Ваш заказ #12345 подтверждён.</p>",
  Tag: "order-confirmation",
});
```

## Отправка в указанный канал

По умолчанию письма уходят в канал `outbound`. Можно указать другой.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Дайджест",
  HtmlBody: "<p>Еженедельные новости</p>",
  MessageStream: "broadcasts",
});
```

## Метаданные

Добавьте произвольные ключ-значение метаданные к письму.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Уведомление",
  HtmlBody: "<p>Текст</p>",
  Metadata: {
    orderId: "12345",
    userId: "67890",
  },
});
```

## Отслеживание открытий

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо с трекингом",
  HtmlBody: "<p>Текст</p>",
  TrackOpens: true,
});
```

## Отслеживание кликов

```typescript
import { LinkTrackingOptions } from "haskimail";

await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо со ссылками",
  HtmlBody: '<p>Перейдите по <a href="https://example.com">ссылке</a></p>',
  TrackLinks: LinkTrackingOptions.HtmlAndText,
});
```

Доступные варианты: `HtmlOnly`, `TextOnly`, `HtmlAndText`, `None`.

## Вложения

```typescript
import * as fs from "fs";

const fileContent = fs.readFileSync("./invoice.pdf");

await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Ваш счёт",
  HtmlBody: "<p>Во вложении ваш счёт.</p>",
  Attachments: [
    {
      Name: "invoice.pdf",
      Content: fileContent.toString("base64"),
      ContentType: "application/pdf",
    },
  ],
});
```

## Встроенные изображения

Используйте `ContentID` для встраивания изображений прямо в тело письма.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо с картинкой",
  HtmlBody: '<p>Логотип: <img src="cid:logo@company" /></p>',
  Attachments: [
    {
      Name: "logo.png",
      Content: fs.readFileSync("./logo.png").toString("base64"),
      ContentType: "image/png",
      ContentID: "cid:logo@company",
    },
  ],
});
```

Подробнее: [[Встраивание изображений]]

## Пользовательские заголовки

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "С заголовками",
  HtmlBody: "<p>Текст</p>",
  Headers: [
    { Name: "X-Custom-Header", Value: "my-value" },
    { Name: "X-Priority", Value: "1" },
  ],
});
```

## Несколько получателей

Укажите получателей через запятую в полях `To`, `Cc`, `Bcc`.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "user1@example.com, user2@example.com",
  Cc: "manager@example.com",
  Subject: "Общее уведомление",
  HtmlBody: "<p>Текст для всех получателей</p>",
});
```
