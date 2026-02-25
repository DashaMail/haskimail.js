<a href="https://haskimail.ru">
    <img src="https://github.com/Dashamail/haskimail.js/raw/main/haskimail.png" alt="Haskimail Logo" title="Haskimail" width="120" height="120" align="right">
</a>

# Haskimail Node.js

Официальная Node.js библиотека для работы с [Haskimail API](https://haskimail.ru).

[![npm version](https://img.shields.io/npm/v/haskimail.svg)](https://www.npmjs.com/package/haskimail)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Установка

```bash
npm install haskimail
```

или

```bash
yarn add haskimail
```

## Быстрый старт

### Отправка письма

```typescript
import { ServerClient } from "haskimail";

const client = new ServerClient("ваш-серверный-токен");

const result = await client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Привет из Haskimail!",
  HtmlBody: "<h1>Привет!</h1><p>Это тестовое письмо.</p>",
  TextBody: "Привет! Это тестовое письмо.",
});

console.log(`Письмо отправлено! MessageID: ${result.MessageID}`);
```

### Отправка с шаблоном

```typescript
const result = await client.sendEmailWithTemplate({
  TemplateId: 12345,
  TemplateModel: {
    name: "Иван",
    company: "Моя компания",
  },
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
});
```

### Пакетная отправка

```typescript
const results = await client.sendEmailBatch([
  {
    From: "sender@ваш-домен.ru",
    To: "user1@example.com",
    Subject: "Письмо 1",
    TextBody: "Содержимое письма 1",
  },
  {
    From: "sender@ваш-домен.ru",
    To: "user2@example.com",
    Subject: "Письмо 2",
    TextBody: "Содержимое письма 2",
  },
]);
```

## Клиенты

Библиотека предоставляет два основных клиента:

### ServerClient

Используется для операций на уровне сервера с серверным токеном (`X-Haskimail-Server-Token`):

- Отправка писем (обычных и по шаблонам)
- Управление шаблонами
- Работа с отказами (bounces)
- Просмотр исходящих и входящих сообщений
- Отслеживание открытий и кликов
- Статистика
- Вебхуки
- Каналы сообщений (message streams)
- Стоп-списки (suppressions)
- Правила входящих сообщений

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("серверный-токен");
```

### AccountClient

Используется для операций на уровне аккаунта с аккаунтным токеном (`X-Haskimail-Account-Token`):

- Управление серверами
- Управление доменами (DKIM, SPF, Return-Path)
- Управление подписями отправителей
- Перенос шаблонов между серверами
- Запросы на удаление данных

```typescript
import { AccountClient } from "haskimail";
const accountClient = new AccountClient("аккаунтный-токен");
```

## Конфигурация

Оба клиента принимают опциональный объект конфигурации:

```typescript
const client = new ServerClient("токен", {
  requestHost: "api.haskimail.ru", // хост API (по умолчанию)
  useHttps: true,                  // использовать HTTPS (по умолчанию true)
  timeout: 180,                    // таймаут в секундах (по умолчанию 180)
});
```

## Справочник методов

### Отправка писем

| Метод | Описание |
|---|---|
| `sendEmail(email)` | Отправка одного письма |
| `sendEmailBatch(emails)` | Пакетная отправка (до 500 писем) |
| `sendEmailWithTemplate(template)` | Отправка с использованием шаблона |
| `sendEmailBatchWithTemplates(templates)` | Пакетная отправка по шаблонам |

### Шаблоны

| Метод | Описание |
|---|---|
| `getTemplates(filter?)` | Получить список шаблонов |
| `getTemplate(idOrAlias)` | Получить шаблон по ID или алиасу |
| `createTemplate(options)` | Создать шаблон |
| `editTemplate(idOrAlias, options)` | Редактировать шаблон |
| `deleteTemplate(idOrAlias)` | Удалить шаблон |
| `validateTemplate(options)` | Валидировать шаблон |

### Отказы (bounces)

| Метод | Описание |
|---|---|
| `getDeliveryStatistics()` | Статистика доставки |
| `getBounces(filter?)` | Список отказов |
| `getBounce(id)` | Детали отказа |
| `getBounceDump(id)` | Дамп отказа |
| `activateBounce(id)` | Активировать (восстановить) отказ |

### Исходящие сообщения

| Метод | Описание |
|---|---|
| `getOutboundMessages(filter?)` | Список исходящих сообщений |
| `getOutboundMessageDetails(messageId)` | Детали сообщения |
| `getOutboundMessageDump(messageId)` | Дамп сообщения |

### Входящие сообщения

| Метод | Описание |
|---|---|
| `getInboundMessages(filter?)` | Список входящих сообщений |
| `getInboundMessageDetails(messageId)` | Детали входящего сообщения |
| `bypassBlockedInboundMessage(messageId)` | Пропустить заблокированное сообщение |
| `retryInboundHookForMessage(messageId)` | Повторить вебхук для сообщения |

### Открытия и клики

| Метод | Описание |
|---|---|
| `getMessageOpens(filter?)` | Список открытий |
| `getMessageOpensForSingleMessage(messageId, filter?)` | Открытия для конкретного письма |
| `getMessageClicks(filter?)` | Список кликов |
| `getMessageClicksForSingleMessage(messageId, filter?)` | Клики для конкретного письма |

### Статистика

| Метод | Описание |
|---|---|
| `getOutboundOverview(filter?)` | Общая статистика исходящих |
| `getSentCounts(filter?)` | Количество отправленных |
| `getBounceCounts(filter?)` | Количество отказов |
| `getSpamComplaintsCounts(filter?)` | Жалобы на спам |
| `getTrackedEmailCounts(filter?)` | Отслеживаемые письма |
| `getEmailOpenCounts(filter?)` | Статистика открытий |
| `getEmailOpenPlatformUsage(filter?)` | Открытия по платформам |
| `getEmailOpenClientUsage(filter?)` | Открытия по клиентам |
| `getEmailOpenReadTimes(filter?)` | Время чтения |
| `getClickCounts(filter?)` | Статистика кликов |
| `getClickBrowserUsage(filter?)` | Клики по браузерам |
| `getClickPlatformUsage(filter?)` | Клики по платформам |
| `getClickLocation(filter?)` | Клики по расположению |

### Каналы сообщений

| Метод | Описание |
|---|---|
| `getMessageStreams(filter?)` | Список каналов |
| `getMessageStream(id)` | Получить канал |
| `createMessageStream(options)` | Создать канал |
| `editMessageStream(id, options)` | Редактировать канал |
| `archiveMessageStream(id)` | Архивировать канал |
| `unarchiveMessageStream(id)` | Разархивировать канал |

### Стоп-списки (suppressions)

| Метод | Описание |
|---|---|
| `getSuppressions(stream, filter?)` | Список подавлений канала |
| `createSuppressions(stream, options)` | Добавить в стоп-список |
| `deleteSuppressions(stream, options)` | Удалить из стоп-списка |

### Вебхуки

| Метод | Описание |
|---|---|
| `getWebhooks(filter?)` | Список вебхуков |
| `getWebhook(id)` | Получить вебхук |
| `createWebhook(options)` | Создать вебхук |
| `editWebhook(id, options)` | Редактировать вебхук |
| `deleteWebhook(id)` | Удалить вебхук |

### Правила входящих

| Метод | Описание |
|---|---|
| `getInboundRuleTriggers(filter?)` | Список правил |
| `createInboundRuleTrigger(options)` | Создать правило |
| `deleteInboundRuleTrigger(id)` | Удалить правило |

### Сервер

| Метод | Описание |
|---|---|
| `getServer()` | Получить настройки сервера |
| `editServer(options)` | Изменить настройки сервера |

## Обработка ошибок

Библиотека предоставляет типизированные ошибки для разных ситуаций:

```typescript
import { ServerClient, Errors } from "haskimail";

const client = new ServerClient("токен");

try {
  await client.sendEmail({ /* ... */ });
} catch (error) {
  if (error instanceof Errors.InvalidAPIKeyError) {
    console.error("Неверный API-ключ");
  } else if (error instanceof Errors.ApiInputError) {
    console.error("Ошибка входных данных:", error.message);
  } else if (error instanceof Errors.RateLimitExceededError) {
    console.error("Превышен лимит запросов");
  } else if (error instanceof Errors.InactiveRecipientsError) {
    console.error("Неактивные получатели:", error.recipients);
  } else if (error instanceof Errors.HaskimailError) {
    console.error(`Ошибка Haskimail [${error.code}]: ${error.message}`);
  }
}
```

### Иерархия ошибок

```
HaskimailError
  └── HttpError
        ├── InvalidAPIKeyError        (HTTP 401)
        ├── ApiInputError             (HTTP 422)
        │     ├── InactiveRecipientsError
        │     └── InvalidEmailRequestError
        ├── RateLimitExceededError     (HTTP 429)
        ├── InternalServerError       (HTTP 500)
        ├── ServiceUnavailableError   (HTTP 503)
        └── UnknownError
```

## Обратная совместимость

Для удобства миграции доступны алиасы:

```typescript
import { Client, AdminClient } from "haskimail";

// Client === ServerClient
// AdminClient === AccountClient
```

## Разработка

```bash
# Установка зависимостей
npm install

# Сборка
npm run build

# Юнит-тесты
npm run test:unit

# Интеграционные тесты (требуют токен)
HASKIMAIL_SERVER_TOKEN=ваш-токен \
HASKIMAIL_FROM_EMAIL=sender@ваш-домен.ru \
HASKIMAIL_TO_EMAIL=recipient@example.com \
npm run test:integration
```

## Ссылки

- [Haskimail](https://haskimail.ru) — сервис транзакционной email-рассылки
- [Документация API](https://haskimail.ru/developer) — справочник по API
- [Wiki](https://github.com/Dashamail/haskimail.js/wiki) — подробное руководство с примерами
- [API-справочник (TypeDoc)](https://dashamail.github.io/haskimail.js/) — автосгенерированная документация по классам и методам
- [Dashamail](https://dashamail.ru) — платформа email-маркетинга
- [npm](https://www.npmjs.com/package/haskimail) — страница пакета на npm
- [GitHub](https://github.com/Dashamail/haskimail.js) — исходный код

## Лицензия

MIT. Подробнее в файле [LICENSE](./LICENSE).
