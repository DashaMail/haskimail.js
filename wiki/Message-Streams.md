# Каналы сообщений (Message Streams)

Каналы позволяют разделять типы рассылок: транзакционные, массовые и т.д. Для управления каналами используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Список каналов

```typescript
const streams = await client.getMessageStreams();

streams.MessageStreams.forEach((s) => {
  console.log(`${s.ID}: ${s.Name} (${s.MessageStreamType})`);
});
```

### С фильтрацией

```typescript
const streams = await client.getMessageStreams({
  messageStreamType: "Transactional",
  includeArchivedStreams: false,
});
```

## Получение канала

```typescript
const stream = await client.getMessageStream("outbound");
console.log(stream.Name, stream.MessageStreamType);
```

## Создание канала

```typescript
const stream = await client.createMessageStream({
  ID: "notifications",
  Name: "Уведомления",
  Description: "Канал для системных уведомлений",
  MessageStreamType: "Transactional",
});

console.log(`Создан канал: ${stream.ID}`);
```

## Редактирование канала

```typescript
await client.editMessageStream("notifications", {
  Name: "Системные уведомления",
  Description: "Обновлённое описание",
});
```

## Архивирование канала

```typescript
const result = await client.archiveMessageStream("notifications");
console.log(`Архивирован. Будет удалён: ${result.ExpectedPurgeDate}`);
```

## Разархивирование канала

```typescript
const result = await client.unarchiveMessageStream("notifications");
console.log(`Восстановлен канал: ${result.Name}`);
```
