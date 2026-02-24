# Руководство по миграции

## Миграция с Postmark на Haskimail

Если вы ранее использовали библиотеку `postmark`, миграция на `haskimail` максимально проста.

### 1. Замена пакета

```bash
npm uninstall postmark
npm install haskimail
```

### 2. Замена импортов

```diff
- import * as postmark from "postmark";
+ import * as haskimail from "haskimail";

- const client = new postmark.ServerClient("токен");
+ const client = new haskimail.ServerClient("токен");
```

Или с деструктуризацией:

```diff
- import { ServerClient, AccountClient } from "postmark";
+ import { ServerClient, AccountClient } from "haskimail";
```

### 3. Код отправки — без изменений

API полностью совместим. Все методы, параметры и типы ответов идентичны.

```typescript
// Этот код работает и с postmark, и с haskimail
const result = await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Тест",
  TextBody: "Текст",
});
```

### 4. Обработка ошибок

Замените `PostmarkError` на `HaskimailError`:

```diff
- } catch (error) {
-   if (error instanceof Errors.PostmarkError) { ... }
+ } catch (error) {
+   if (error instanceof Errors.HaskimailError) { ... }
```

### Ключевые отличия

| | Postmark | Haskimail |
|---|---|---|
| npm пакет | `postmark` | `haskimail` |
| Хост API | `api.postmarkapp.com` | `api.haskimail.ru` |
| Заголовок сервера | `X-Postmark-Server-Token` | `X-Haskimail-Server-Token` |
| Заголовок аккаунта | `X-Postmark-Account-Token` | `X-Haskimail-Account-Token` |
| Базовый класс ошибок | `PostmarkError` | `HaskimailError` |
| User-Agent | `Postmark.JS` | `Haskimail.JS` |

### Обратная совместимость

Алиасы `Client` и `AdminClient` сохранены:

```typescript
import { Client, AdminClient } from "haskimail";
// Client === ServerClient
// AdminClient === AccountClient
```
