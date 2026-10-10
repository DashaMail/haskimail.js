# Подписи отправителей

Подписи отправителей подтверждают, что вы имеете право отправлять письма от определённого адреса. Для управления используется `AccountClient`.

```typescript
import { AccountClient } from "haskimail";
const client = new AccountClient("ваш-аккаунтный-токен");
```

## Список подписей

```typescript
const signatures = await client.getSenderSignatures({
  count: 50,
  offset: 0,
});

signatures.SenderSignatures.forEach((s) => {
  console.log(`${s.ID}: ${s.EmailAddress} (${s.Confirmed ? "подтверждена" : "ожидает"})`);
});
```

## Получение подписи

```typescript
const signature = await client.getSenderSignature(12345);
console.log(signature.EmailAddress, signature.Name);
```

## Создание подписи

```typescript
const signature = await client.createSenderSignature({
  FromEmail: "noreply@example.ru",
  Name: "Сервис уведомлений",
  ReplyToEmail: "support@example.ru",
});

console.log(`Создана подпись: ${signature.EmailAddress}`);
console.log("Проверьте почту для подтверждения.");
```

## Редактирование подписи

```typescript
await client.editSenderSignature(12345, {
  Name: "Обновлённое имя",
  ReplyToEmail: "new-support@example.ru",
});
```

## Повторная отправка подтверждения

```typescript
await client.resendSenderSignatureConfirmation(12345);
console.log("Письмо подтверждения отправлено повторно.");
```

## Удаление подписи

```typescript
await client.deleteSenderSignature(12345);
```
