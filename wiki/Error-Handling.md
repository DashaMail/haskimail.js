# Обработка ошибок

Библиотека предоставляет типизированные ошибки для различных HTTP-статусов и ситуаций.

## Обработка через Promise

Рекомендуемый способ — использование `try/catch` или `.catch()`.

```typescript
import { ServerClient, Errors } from "haskimail";

const client = new ServerClient("ваш-серверный-токен");

try {
  await client.sendEmail({
    From: "sender@ваш-домен.ru",
    To: "recipient@example.com",
    Subject: "Тест",
    TextBody: "Текст",
  });
} catch (error) {
  if (error instanceof Errors.InvalidAPIKeyError) {
    // HTTP 401 — неверный API-ключ
    console.error("Проверьте серверный токен.");

  } else if (error instanceof Errors.InactiveRecipientsError) {
    // Получатели в стоп-списке
    console.error("Неактивные получатели:", error.recipients);

  } else if (error instanceof Errors.InvalidEmailRequestError) {
    // Некорректный запрос (невалидный email, пустое тело и т.д.)
    console.error("Ошибка запроса:", error.message);

  } else if (error instanceof Errors.ApiInputError) {
    // HTTP 422 — ошибка входных данных (общий случай)
    console.error("Ошибка API:", error.message, "Код:", error.code);

  } else if (error instanceof Errors.RateLimitExceededError) {
    // HTTP 429 — слишком много запросов
    console.error("Превышен лимит запросов. Подождите и повторите.");

  } else if (error instanceof Errors.InternalServerError) {
    // HTTP 500
    console.error("Внутренняя ошибка сервера Haskimail.");

  } else if (error instanceof Errors.ServiceUnavailableError) {
    // HTTP 503
    console.error("Сервис временно недоступен.");

  } else if (error instanceof Errors.HaskimailError) {
    // Базовый класс всех ошибок Haskimail
    console.error(`Ошибка [${error.code}]: ${error.message}`);
  }
}
```

## Обработка через .catch()

```typescript
client.sendEmail({
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
  Subject: "Тест",
  TextBody: "Текст",
}).then((result) => {
  console.log("Отправлено:", result.MessageID);
}).catch((error) => {
  if (error instanceof Errors.HaskimailError) {
    console.error(`Код: ${error.code}, Статус: ${error.statusCode}`);
    console.error(`Сообщение: ${error.message}`);
  } else {
    console.error("Неизвестная ошибка:", error);
  }
});
```

## Иерархия ошибок

```
HaskimailError                    — базовый класс
  └── HttpError                   — HTTP-ошибки
        ├── InvalidAPIKeyError        (HTTP 401)
        ├── ApiInputError             (HTTP 422)
        │     ├── InactiveRecipientsError  (код 406)
        │     └── InvalidEmailRequestError (код 405)
        ├── RateLimitExceededError     (HTTP 429)
        ├── InternalServerError       (HTTP 500)
        ├── ServiceUnavailableError   (HTTP 503)
        └── UnknownError              (прочие)
```

## Свойства ошибок

| Свойство | Тип | Описание |
|---|---|---|
| `message` | `string` | Текстовое описание ошибки |
| `code` | `number` | Код ошибки API |
| `statusCode` | `number` | HTTP-статус ответа |
| `name` | `string` | Имя класса ошибки |

### InactiveRecipientsError

Дополнительное свойство `recipients` содержит массив неактивных email-адресов.

```typescript
if (error instanceof Errors.InactiveRecipientsError) {
  error.recipients.forEach((email) => {
    console.log(`Неактивен: ${email}`);
  });
}
```
