# Серверы (управление на уровне аккаунта)

Для управления серверами на уровне аккаунта используется `AccountClient` с аккаунтным токеном.

```typescript
import { AccountClient } from "haskimail";
const client = new AccountClient("ваш-аккаунтный-токен");
```

## Список серверов

```typescript
const servers = await client.getServers({
  count: 50,
  offset: 0,
});

servers.Servers.forEach((s) => {
  console.log(`${s.ID}: ${s.Name} (${s.Color})`);
});
```

### Фильтрация по имени

```typescript
const servers = await client.getServers({
  count: 10,
  name: "Production",
});
```

## Получение сервера по ID

```typescript
const server = await client.getServer(12345);
console.log(server.Name, server.Color);
```

## Создание сервера

```typescript
const server = await client.createServer({
  Name: "Новый сервер",
  Color: "blue",
  TrackOpens: true,
  TrackLinks: "HtmlAndText",
  SmtpApiActivated: true,
});

console.log(`Создан сервер ID: ${server.ID}`);
```

## Редактирование сервера

```typescript
const updated = await client.editServer(12345, {
  Name: "Обновлённый сервер",
  Color: "green",
});
```

## Удаление сервера

```typescript
await client.deleteServer(12345);
```

> **Внимание**: удаление сервера необратимо и удалит все связанные данные.
