# Стоп-списки (Suppressions)

Стоп-списки содержат адреса, на которые не будут отправляться письма в рамках определённого канала. Для управления используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Получение стоп-списка

```typescript
const suppressions = await client.getSuppressions("outbound");

suppressions.Suppressions.forEach((s) => {
  console.log(`${s.EmailAddress} — ${s.SuppressionReason} (${s.CreatedAt})`);
});
```

### С фильтрацией

```typescript
const suppressions = await client.getSuppressions("outbound", {
  SuppressionReason: "HardBounce",
  Origin: "Recipient",
});
```

## Добавление в стоп-список

```typescript
const result = await client.createSuppressions("outbound", {
  Suppressions: [
    { EmailAddress: "user1@example.com" },
    { EmailAddress: "user2@example.com" },
  ],
});

result.Suppressions.forEach((s) => {
  console.log(`${s.EmailAddress}: ${s.Status} — ${s.Message}`);
});
```

## Удаление из стоп-списка

```typescript
const result = await client.deleteSuppressions("outbound", {
  Suppressions: [
    { EmailAddress: "user1@example.com" },
  ],
});

result.Suppressions.forEach((s) => {
  console.log(`${s.EmailAddress}: ${s.Status} — ${s.Message}`);
});
```
