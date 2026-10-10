# Отказы (Bounces)

Для работы с отказами используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Статистика доставки

```typescript
const stats = await client.getDeliveryStatistics();

stats.Bounces.forEach((b) => {
  console.log(`${b.Name}: ${b.Count}`);
});
```

## Список отказов

```typescript
const bounces = await client.getBounces({
  count: 50,
  offset: 0,
});

console.log(`Всего отказов: ${bounces.TotalCount}`);
bounces.Bounces.forEach((b) => {
  console.log(`${b.Email} — ${b.Type} (${b.Description})`);
});
```

### Фильтрация

```typescript
const filtered = await client.getBounces({
  count: 10,
  offset: 0,
  type: "HardBounce",
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});
```
