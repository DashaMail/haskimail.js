# Шаблоны

Для работы с шаблонами используется `ServerClient`.

```typescript
import { ServerClient } from "haskimail";
const client = new ServerClient("ваш-серверный-токен");
```

## Получение шаблонов

### Список шаблонов

```typescript
const templates = await client.getTemplates({
  count: 50,
  offset: 0,
  templateType: "Standard",  // "Standard", "Layout" или "All"
});

templates.Templates.forEach((t) => {
  console.log(`${t.TemplateId}: ${t.Name} (${t.Alias || "без алиаса"})`);
});
```

### Получение шаблона по ID

```typescript
const template = await client.getTemplate(12345);
console.log(template.Name, template.Subject);
```

### Получение шаблона по алиасу

```typescript
const template = await client.getTemplate("welcome-email");
```

## Создание шаблона

### Стандартный шаблон

```typescript
const template = await client.createTemplate({
  Name: "Приветственное письмо",
  Alias: "welcome",
  Subject: "Добро пожаловать, {{name}}!",
  HtmlBody: "<h1>Привет, {{name}}!</h1><p>Рады видеть вас.</p>",
  TextBody: "Привет, {{name}}! Рады видеть вас.",
});

console.log(`Создан шаблон ID: ${template.TemplateId}`);
```

### Шаблон-макет (Layout)

```typescript
const layout = await client.createTemplate({
  Name: "Основной макет",
  Alias: "main-layout",
  TemplateType: "Layout",
  HtmlBody: `
    <html>
    <body>
      <header><img src="https://ваш-сайт.ru/logo.png" /></header>
      <main>{{{@content}}}</main>
      <footer><p>© Ваша компания</p></footer>
    </body>
    </html>
  `,
});
```

## Редактирование шаблона

### По ID

```typescript
await client.editTemplate(12345, {
  Subject: "Обновлённая тема: {{name}}",
  HtmlBody: "<h1>Обновлённый шаблон</h1>",
});
```

### По алиасу

```typescript
await client.editTemplate("welcome", {
  Name: "Приветственное письмо v2",
});
```

## Удаление шаблона

```typescript
await client.deleteTemplate(12345);
// или
await client.deleteTemplate("welcome");
```

## Валидация шаблона

Проверка корректности шаблона без сохранения.

```typescript
const validation = await client.validateTemplate({
  Subject: "Тест {{name}}",
  HtmlBody: "<p>Привет, {{name}}!</p>",
  TextBody: "Привет, {{name}}!",
  TestRenderModel: {
    name: "Иван",
  },
});

if (validation.AllContentIsValid) {
  console.log("Шаблон валиден");
  console.log("HTML:", validation.HtmlBody?.RenderedContent);
} else {
  console.log("Ошибки:", validation.HtmlBody?.ValidationErrors);
}
```

## Отправка с шаблоном

### Одно письмо

```typescript
const result = await client.sendEmailWithTemplate({
  TemplateId: 12345,
  // или: TemplateAlias: "welcome",
  TemplateModel: {
    name: "Иван",
    company: "Моя компания",
    action_url: "https://example.com/activate",
  },
  From: "sender@ваш-домен.ru",
  To: "recipient@example.com",
});
```

### Пакетная отправка по шаблону

```typescript
const results = await client.sendEmailBatchWithTemplates([
  {
    TemplateAlias: "welcome",
    TemplateModel: { name: "Иван" },
    From: "sender@ваш-домен.ru",
    To: "ivan@example.com",
  },
  {
    TemplateAlias: "welcome",
    TemplateModel: { name: "Мария" },
    From: "sender@ваш-домен.ru",
    To: "maria@example.com",
  },
]);
```
