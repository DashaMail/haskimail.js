# Статистика

Для получения статистики по исходящим письмам используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Общая статистика

```typescript
const overview = await client.getOutboundOverview({
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});

console.log(`Отправлено: ${overview.Sent}`);
console.log(`Открыто: ${overview.Opens}`);
console.log(`Отказов: ${overview.Bounced}`);
console.log(`Спам-жалоб: ${overview.SpamComplaints}`);
```

## Количество отправленных

```typescript
const sent = await client.getSentCounts({
  fromdate: "2024-01-01",
  todate: "2024-01-31",
  tag: "welcome",
});

console.log(`Отправлено: ${sent.Sent}`);
sent.Days?.forEach((d) => {
  console.log(`  ${d.Date}: ${d.Sent}`);
});
```

## Статистика отказов

```typescript
const bounces = await client.getBounceCounts({
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});
console.log(`Hard: ${bounces.HardBounce}, Soft: ${bounces.SoftBounce}`);
```

## Жалобы на спам

```typescript
const spam = await client.getSpamComplaintsCounts({
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});
console.log(`Жалоб: ${spam.SpamComplaint}`);
```

## Открытия

```typescript
const opens = await client.getEmailOpenCounts({
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});
console.log(`Открытий: ${opens.Opens}, Уникальных: ${opens.Unique}`);
```

## Клики

```typescript
const clicks = await client.getClickCounts({
  fromdate: "2024-01-01",
  todate: "2024-12-31",
});
console.log(`Кликов: ${clicks.Clicks}, Уникальных: ${clicks.Unique}`);
```

## Общие параметры фильтрации

Все методы статистики принимают опциональный фильтр:

| Параметр | Тип | Описание |
|---|---|---|
| `tag` | `string` | Фильтр по тегу |
| `fromdate` | `string` | Начало периода (YYYY-MM-DD) |
| `todate` | `string` | Конец периода (YYYY-MM-DD) |
| `messagestream` | `string` | Фильтр по каналу |
