# Перенос шаблонов

Перенос шаблонов между серверами — операция уровня аккаунта, для неё используется `AccountClient`.

```typescript
import { AccountClient } from "haskimail";
const client = new AccountClient("ваш-аккаунтный-токен");
```

## Перенос шаблонов между серверами

```typescript
const result = await client.pushTemplates({
  SourceServerID: 1,
  DestinationServerID: 2,
  PerformChanges: true,  // false для «пробного прогона»
});

console.log(`Перенесено шаблонов: ${result.TotalCount}`);
result.Templates.forEach((t) => {
  console.log(`  ${t.Action}: ${t.Name}`);
});
```

### Пробный прогон

Установите `PerformChanges: false`, чтобы посмотреть, какие шаблоны будут перенесены, без фактического выполнения.

```typescript
const preview = await client.pushTemplates({
  SourceServerID: 1,
  DestinationServerID: 2,
  PerformChanges: false,
});

console.log("Будут перенесены:");
preview.Templates.forEach((t) => {
  console.log(`  [${t.Action}] ${t.Name}`);
});
```
