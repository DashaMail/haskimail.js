# Устранение проблем

Если вы столкнулись с проблемой при использовании библиотеки `haskimail`, следуйте этим шагам.

## Шаг 1: Проверьте токен

Убедитесь, что вы используете правильный тип токена:

- `ServerClient` — **серверный** токен (`X-Haskimail-Server-Token`)
- `AccountClient` — **аккаунтный** токен (`X-Haskimail-Account-Token`)

```typescript
// Серверный — для отправки писем, шаблонов, статистики
const serverClient = new ServerClient("серверный-токен");

// Аккаунтный — для управления серверами и доменами
const accountClient = new AccountClient("аккаунтный-токен");
```

## Шаг 2: Проверьте подпись отправителя

Адрес `From` должен быть подтверждён в Haskimail (через подпись отправителя или подтверждённый домен).

## Шаг 3: Проверьте обработку ошибок

Добавьте обработку ошибок для получения деталей:

```typescript
try {
  await client.sendEmail({ /* ... */ });
} catch (error) {
  console.error("Имя ошибки:", error.name);
  console.error("Сообщение:", error.message);
  console.error("Код:", error.code);
  console.error("HTTP-статус:", error.statusCode);
}
```

## Шаг 4: Проверьте версию Node.js

```bash
node --version  # требуется ≥ 14.0.0
```

## Шаг 5: Проверьте сетевое подключение

```bash
curl -s -o /dev/null -w "%{http_code}" https://api.haskimail.ru
```

Ожидаемый ответ: HTTP-код (не ошибка сети).

## Поддержка

- [GitHub Issues](https://github.com/Dashamail/haskimail.js/issues) — баг-репорты и предложения
- [Известные проблемы](Known-Issues) — типичные ошибки и решения
- [Документация API](https://haskimail.ru/developer) — справочник REST API
- Техподдержка: support@dashamail.ru
