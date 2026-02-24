# Удаление данных

Запросы на удаление персональных данных (GDPR). Для управления используется `AccountClient`.

```typescript
import { AccountClient } from "haskimail";
const client = new AccountClient("ваш-аккаунтный-токен");
```

## Создание запроса на удаление данных

```typescript
const result = await client.requestDataRemoval({
  RequestedFor: "user@example.com",
  RequestedBy: "admin@ваша-компания.ru",
  NotifyWhenCompleted: true,
});

console.log(`Запрос создан, ID: ${result.ID}, статус: ${result.Status}`);
```

## Проверка статуса

```typescript
const status = await client.getDataRemovalStatus(12345);
console.log(`Статус: ${status.Status}`);
```
