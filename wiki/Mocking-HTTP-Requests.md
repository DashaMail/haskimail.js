# Мокирование HTTP-запросов

При написании тестов для вашего приложения полезно мокировать запросы к API, чтобы не тратить реальные ресурсы.

## Использование Jest

### Мокирование axios

Библиотека `haskimail` использует `axios` для HTTP-запросов. Его можно легко замокать.

```typescript
import axios from "axios";
import { ServerClient } from "haskimail";

jest.mock("axios", () => {
  const mockInstance = {
    request: jest.fn(),
  };
  return {
    create: jest.fn(() => mockInstance),
    isAxiosError: jest.fn(() => false),
    __mockInstance: mockInstance,
  };
});

function getMockAxios() {
  return (axios as any).__mockInstance;
}

describe("Мой сервис отправки", () => {
  it("должен отправить письмо", async () => {
    getMockAxios().request.mockResolvedValueOnce({
      data: {
        To: "user@example.com",
        MessageID: "test-id",
        ErrorCode: 0,
        Message: "OK",
      },
    });

    const client = new ServerClient("test-token");
    const result = await client.sendEmail({
      From: "sender@example.com",
      To: "user@example.com",
      Subject: "Тест",
      TextBody: "Текст",
    });

    expect(result.MessageID).toBe("test-id");
    expect(getMockAxios().request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/email",
      })
    );
  });
});
```

## Использование nock

Библиотека [nock](https://github.com/nock/nock) позволяет перехватывать HTTP-запросы на уровне Node.js.

```typescript
import nock from "nock";
import { ServerClient } from "haskimail";

describe("Мой сервис", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("должен отправить письмо", async () => {
    nock("https://api.haskimail.ru")
      .post("/email")
      .reply(200, {
        To: "user@example.com",
        MessageID: "mock-id-123",
        ErrorCode: 0,
        Message: "OK",
      });

    const client = new ServerClient("test-token");
    const result = await client.sendEmail({
      From: "sender@example.com",
      To: "user@example.com",
      Subject: "Тест",
      TextBody: "Текст",
    });

    expect(result.MessageID).toBe("mock-id-123");
  });

  it("должен обработать ошибку авторизации", async () => {
    nock("https://api.haskimail.ru")
      .post("/email")
      .reply(401, {
        ErrorCode: 10,
        Message: "Bad or missing Server API token.",
      });

    const client = new ServerClient("invalid-token");

    await expect(
      client.sendEmail({
        From: "sender@example.com",
        To: "user@example.com",
        Subject: "Тест",
        TextBody: "Текст",
      })
    ).rejects.toThrow();
  });
});
```
