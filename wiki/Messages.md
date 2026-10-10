# Сообщения

Для работы с историей сообщений используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Исходящие сообщения

### Список исходящих

```typescript
const messages = await client.getOutboundMessages({
  count: 50,
  offset: 0,
});

console.log(`Всего: ${messages.TotalCount}`);
messages.Messages.forEach((m) => {
  console.log(`${m.MessageID}: ${m.Subject} -> ${m.To}`);
});
```

### Фильтрация по получателю или тегу

```typescript
const filtered = await client.getOutboundMessages({
  count: 20,
  recipient: "user@example.com",
  tag: "order-confirmation",
});
```

### Детали сообщения

```typescript
const details = await client.getOutboundMessageDetails("message-id-here");
console.log(details.Subject, details.Status, details.TrackOpens);
```

## Входящие сообщения

### Список входящих

```typescript
const inbound = await client.getInboundMessages({
  count: 50,
  offset: 0,
});

inbound.Messages.forEach((m) => {
  console.log(`${m.From}: ${m.Subject}`);
});
```

### Детали входящего сообщения

```typescript
const details = await client.getInboundMessageDetails("message-id-here");
console.log(details.From, details.Subject, details.Status);
```

### Пропуск заблокированного сообщения

```typescript
await client.bypassBlockedInboundMessage("message-id-here");
```

### Повторная отправка вебхука

```typescript
await client.retryInboundHookForMessage("message-id-here");
```
