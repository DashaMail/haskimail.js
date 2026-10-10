import axios from "axios";
import { ServerClient } from "../../src/client/ServerClient";

// Мокаем axios для юнит-тестов
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

describe("ServerClient", () => {
  let client: ServerClient;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new ServerClient("test-server-token");
  });

  describe("создание клиента", () => {
    it("должен создать клиент с токеном сервера", () => {
      expect(client).toBeInstanceOf(ServerClient);
    });

    it("должен принимать пользовательскую конфигурацию", () => {
      const customClient = new ServerClient("token", {
        requestHost: "custom.host.ru",
        timeout: 30,
      });
      const config = customClient.getClientOptions();
      expect(config.requestHost).toBe("custom.host.ru");
      expect(config.timeout).toBe(30);
    });

    it("должен передавать правильный заголовок авторизации", () => {
      new ServerClient("my-token");
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-Haskimail-Server-Token": "my-token",
          }),
        })
      );
    });

    it("должен использовать User-Agent с названием Haskimail", () => {
      new ServerClient("my-token");
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            "User-Agent": expect.stringContaining("Haskimail"),
          }),
        })
      );
    });

    it("должен использовать api.haskimail.ru по умолчанию", () => {
      new ServerClient("my-token");
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: "https://api.haskimail.ru",
        })
      );
    });
  });

  describe("отправка писем", () => {
    it("sendEmail - должен отправить POST на /email", async () => {
      const mockResponse = {
        data: {
          To: "test@example.com",
          MessageID: "abc-123",
          ErrorCode: 0,
          Message: "OK",
        },
      };
      getMockAxios().request.mockResolvedValueOnce(mockResponse);

      const result = await client.sendEmail({
        From: "sender@example.com",
        To: "test@example.com",
        Subject: "Тестовое письмо",
        HtmlBody: "<b>Привет</b>",
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/email",
        })
      );
      expect(result.MessageID).toBe("abc-123");
    });

    it("sendEmailBatch - должен отправить POST на /email/batch", async () => {
      const mockResponse = {
        data: [
          { To: "a@test.com", MessageID: "1", ErrorCode: 0, Message: "OK" },
          { To: "b@test.com", MessageID: "2", ErrorCode: 0, Message: "OK" },
        ],
      };
      getMockAxios().request.mockResolvedValueOnce(mockResponse);

      const result = await client.sendEmailBatch([
        { From: "s@test.com", To: "a@test.com", Subject: "Тест 1" },
        { From: "s@test.com", To: "b@test.com", Subject: "Тест 2" },
      ]);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/email/batch",
        })
      );
      expect(result).toHaveLength(2);
    });

    it("sendEmailWithTemplate - должен отправить POST на /email/withTemplate", async () => {
      const mockResponse = {
        data: {
          To: "test@example.com",
          MessageID: "tpl-123",
          ErrorCode: 0,
          Message: "OK",
        },
      };
      getMockAxios().request.mockResolvedValueOnce(mockResponse);

      await client.sendEmailWithTemplate({
        TemplateId: 1,
        TemplateModel: { name: "Иван" },
        From: "sender@example.com",
        To: "test@example.com",
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/email/withTemplate",
        })
      );
    });
  });

  describe("отказы (bounces)", () => {
    it("getDeliveryStatistics - должен отправить GET на /deliverystats", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { InactiveMails: 5, Bounces: [] },
      });

      const result = await client.getDeliveryStatistics();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/deliverystats",
        })
      );
      expect(result.InactiveMails).toBe(5);
    });

    it("getBounces - должен устанавливать пагинацию по умолчанию", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 0, Bounces: [] },
      });

      await client.getBounces();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/bounces",
          params: expect.objectContaining({
            count: 100,
            offset: 0,
          }),
        })
      );
    });
  });

  describe("шаблоны", () => {
    it("getTemplates - должен отправить GET на /templates", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 1, Templates: [{ TemplateId: 1, Name: "Тест" }] },
      });

      const result = await client.getTemplates();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/templates",
        })
      );
      expect(result.TotalCount).toBe(1);
    });

    it("createTemplate - должен отправить POST на /templates", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TemplateId: 42, Name: "Новый шаблон" },
      });

      await client.createTemplate({
        Name: "Новый шаблон",
        Subject: "Тема",
        HtmlBody: "<p>Контент</p>",
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/templates",
          data: expect.objectContaining({ Name: "Новый шаблон" }),
        })
      );
    });

    it("deleteTemplate - должен отправить DELETE на /templates/{id}", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ErrorCode: 0, Message: "Удалено" },
      });

      await client.deleteTemplate(42);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: "/templates/42",
        })
      );
    });
  });

  describe("вебхуки", () => {
    it("getWebhooks - должен отправить GET на /webhooks", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { Webhooks: [] },
      });

      await client.getWebhooks();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/webhooks",
        })
      );
    });

    it("createWebhook - должен отправить POST на /webhooks", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ID: 1, Url: "https://example.com/hook" },
      });

      await client.createWebhook({
        Url: "https://example.com/hook",
        Triggers: { Open: { Enabled: true }, Click: { Enabled: true } },
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/webhooks",
        })
      );
    });
  });

  describe("каналы сообщений", () => {
    it("getMessageStreams - должен отправить GET на /message-streams", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 1, MessageStreams: [] },
      });

      await client.getMessageStreams();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/message-streams",
        })
      );
    });
  });

  describe("стоп-списки (suppressions)", () => {
    it("getSuppressions - должен отправить GET на /message-streams/{id}/suppressions/dump", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { Suppressions: [] },
      });

      await client.getSuppressions("outbound");

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/message-streams/outbound/suppressions/dump",
        })
      );
    });

    it("createSuppressions - должен отправить POST", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { Suppressions: [{ EmailAddress: "spam@test.com", Status: "Suppressed" }] },
      });

      await client.createSuppressions("outbound", {
        Suppressions: [{ EmailAddress: "spam@test.com" }],
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/message-streams/outbound/suppressions",
        })
      );
    });
  });

  describe("статистика", () => {
    it("getOutboundOverview - должен отправить GET на /stats", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { Sent: 100, Bounced: 5 },
      });

      const result = await client.getOutboundOverview();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/stats",
        })
      );
      expect(result.Sent).toBe(100);
    });

    it("getSentCounts - должен принимать фильтры по дате", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { Days: [], Sent: 50 },
      });

      await client.getSentCounts({
        fromdate: "2025-01-01",
        todate: "2025-01-31",
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/stats/sends",
          params: expect.objectContaining({
            fromdate: "2025-01-01",
            todate: "2025-01-31",
          }),
        })
      );
    });
  });
});
