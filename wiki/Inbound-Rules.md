# Правила входящих сообщений

Правила входящих позволяют управлять обработкой входящей почты. Для управления используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Список правил

```typescript
const rules = await client.getInboundRuleTriggers({
  count: 50,
  offset: 0,
});

rules.InboundRules.forEach((r) => {
  console.log(`${r.ID}: ${r.Rule}`);
});
```

## Создание правила

```typescript
const rule = await client.createInboundRuleTrigger({
  Rule: "support.example.com",
});

console.log(`Создано правило ID: ${rule.ID} для ${rule.Rule}`);
```

## Удаление правила

```typescript
await client.deleteInboundRuleTrigger(12345);
```
