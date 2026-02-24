# Известные проблемы и их решение

## Ошибка установки: несовместимость версии Node.js

**Проблема**: `npm install` завершается с ошибкой совместимости.

**Решение**: Библиотека требует Node.js ≥ 14.0.0. Обновите Node.js:

```bash
node --version  # проверьте текущую версию
```

## SyntaxError: Unexpected Token Import

**Проблема**: ошибка при использовании `import` в среде без поддержки ESM.

**Решение**: используйте `require()` вместо `import`:

```javascript
const { ServerClient } = require("haskimail");
```

Или убедитесь, что ваш проект настроен для ESM (`"type": "module"` в package.json или расширение `.mjs`).

## Ошибка «The String Did Not Match the Expected Pattern»

**Проблема**: возникает при использовании Jest с `testEnvironment: "jsdom"`.

**Решение**: используйте `testEnvironment: "node"` в конфигурации Jest:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "node",
};
```

## Не работает в Cloudflare Workers / Deno / Bun

**Проблема**: библиотека использует `axios`, который рассчитан на Node.js.

**Решение**: библиотека предназначена для Node.js (≥ 14). Для других рантаймов рекомендуем использовать [Haskimail REST API](https://haskimail.ru/developer) напрямую с `fetch()`.

## Ошибка EACCES при npm install

**Проблема**: ошибка прав доступа к npm-кэшу.

**Решение**:

```bash
sudo chown -R $(whoami) ~/.npm
```

## Таймаут запросов

**Проблема**: запросы завершаются по таймауту.

**Решение**: увеличьте таймаут при создании клиента:

```typescript
const client = new ServerClient("токен", {
  timeout: 300,  // 5 минут в секундах
});
```
