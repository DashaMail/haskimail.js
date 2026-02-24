# Встраивание изображений

Есть два способа включить изображения в email-письма.

## Способ 1: Ссылка на внешнее изображение

Самый простой способ — указать URL изображения.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо с картинкой",
  HtmlBody: '<p><img src="https://ваш-сайт.ru/images/banner.png" alt="Баннер" /></p>',
});
```

> **Примечание**: некоторые почтовые клиенты блокируют внешние изображения по умолчанию.

## Способ 2: Встроенное вложение (inline attachment)

Изображение передаётся как base64-вложение с `ContentID`, а в HTML используется `cid:` ссылка.

### Шаг 1: HTML-шаблон с cid-ссылкой

```html
<p>Здравствуйте!</p>
<p>Логотип нашей компании:</p>
<img src="cid:logo@company" alt="Логотип" />
<p>С уважением, команда.</p>
```

### Шаг 2: Отправка с вложением

```typescript
import * as fs from "fs";
import { ServerClient } from "haskimail";

const client = new ServerClient("ваш-серверный-токен");

const logoBase64 = fs.readFileSync("./logo.png").toString("base64");

await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо с встроенным логотипом",
  HtmlBody: `
    <p>Здравствуйте!</p>
    <img src="cid:logo@company" alt="Логотип" />
    <p>С уважением, команда.</p>
  `,
  Attachments: [
    {
      Name: "logo.png",
      Content: logoBase64,
      ContentType: "image/png",
      ContentID: "cid:logo@company",
    },
  ],
});
```

### Несколько встроенных изображений

Каждому изображению нужен уникальный `ContentID`.

```typescript
await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Письмо с несколькими картинками",
  HtmlBody: `
    <img src="cid:header@mail" />
    <p>Текст письма</p>
    <img src="cid:footer@mail" />
  `,
  Attachments: [
    {
      Name: "header.png",
      Content: fs.readFileSync("./header.png").toString("base64"),
      ContentType: "image/png",
      ContentID: "cid:header@mail",
    },
    {
      Name: "footer.png",
      Content: fs.readFileSync("./footer.png").toString("base64"),
      ContentType: "image/png",
      ContentID: "cid:footer@mail",
    },
  ],
});
```
