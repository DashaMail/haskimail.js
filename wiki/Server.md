# Сервер (настройки текущего сервера)

Управление настройками текущего сервера осуществляется через `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Получение настроек сервера

```typescript
const server = await client.getServer();
console.log(`Имя: ${server.Name}`);
console.log(`Цвет: ${server.Color}`);
console.log(`Отслеживание открытий: ${server.TrackOpens}`);
console.log(`Отслеживание кликов: ${server.TrackLinks}`);
```

## Изменение настроек сервера

```typescript
const updated = await client.editServer({
  Color: "green",
  TrackOpens: true,
  TrackLinks: "HtmlAndText",
});

console.log(`Обновлён: ${updated.Name}, цвет: ${updated.Color}`);
```
