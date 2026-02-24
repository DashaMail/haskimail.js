# Домены

Для управления доменами используется `AccountClient`.

```typescript
import { AccountClient } from "haskimail";
const client = new AccountClient("ваш-аккаунтный-токен");
```

## Список доменов

```typescript
const domains = await client.getDomains({
  count: 50,
  offset: 0,
});

domains.Domains.forEach((d) => {
  console.log(`${d.ID}: ${d.Name} (DKIM: ${d.DKIMVerified}, SPF: ${d.SPFVerified})`);
});
```

## Получение домена

```typescript
const domain = await client.getDomain(12345);
console.log(`Домен: ${domain.Name}`);
console.log(`DKIM Host: ${domain.DKIMHost}`);
console.log(`SPF Host: ${domain.SPFHost}`);
console.log(`Return-Path: ${domain.ReturnPathDomain}`);
```

## Создание домена

```typescript
const domain = await client.createDomain({
  Name: "example.ru",
  ReturnPathDomain: "pm-bounces.example.ru",
});

console.log(`Создан домен: ${domain.Name} (ID: ${domain.ID})`);
console.log(`Добавьте DKIM запись: ${domain.DKIMHost} -> ${domain.DKIMTextValue}`);
```

## Верификация DKIM

```typescript
const result = await client.verifyDomainDKIM(12345);

if (result.DKIMVerified) {
  console.log("DKIM верифицирован!");
} else {
  console.log("DKIM ещё не верифицирован. Проверьте DNS записи.");
}
```

## Верификация SPF

```typescript
const result = await client.verifyDomainSPF(12345);
console.log(`SPF верифицирован: ${result.SPFVerified}`);
```

## Верификация Return-Path

```typescript
const result = await client.verifyDomainReturnPath(12345);
console.log(`Return-Path верифицирован: ${result.ReturnPathDomainVerified}`);
```

## Ротация DKIM-ключа

```typescript
const result = await client.rotateDomainDKIM(12345);
console.log(`Новый DKIM Host: ${result.DKIMPendingHost}`);
console.log(`Новое значение: ${result.DKIMPendingTextValue}`);
```

## Редактирование домена

```typescript
await client.editDomain(12345, {
  ReturnPathDomain: "new-bounces.example.ru",
});
```

## Удаление домена

```typescript
await client.deleteDomain(12345);
```
