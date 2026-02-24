import { HttpClient } from "../../src/client/HttpClient";

describe("HttpClient", () => {
  describe("создание клиента", () => {
    it("должен использовать настройки по умолчанию", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token");
      const config = client.getConfiguration();

      expect(config.useHttps).toBe(true);
      expect(config.requestHost).toBe("api.haskimail.ru");
      expect(config.timeout).toBe(180);
    });

    it("должен позволять переопределять хост", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token", {
        requestHost: "custom.api.ru",
      });
      const config = client.getConfiguration();

      expect(config.requestHost).toBe("custom.api.ru");
      expect(config.useHttps).toBe(true);
    });

    it("должен позволять отключить HTTPS", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token", {
        useHttps: false,
      });

      expect(client.getBaseUrl()).toBe("http://api.haskimail.ru");
    });

    it("должен формировать правильный базовый URL по умолчанию", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token");
      expect(client.getBaseUrl()).toBe("https://api.haskimail.ru");
    });

    it("должен позволять переопределять таймаут", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token", {
        timeout: 60,
      });
      const config = client.getConfiguration();

      expect(config.timeout).toBe(60);
    });
  });

  describe("обновление конфигурации", () => {
    it("должен обновлять конфигурацию частично", () => {
      const client = new HttpClient("test-token", "X-Haskimail-Server-Token");
      client.setConfiguration({ timeout: 30 });
      const config = client.getConfiguration();

      expect(config.timeout).toBe(30);
      expect(config.requestHost).toBe("api.haskimail.ru");
    });
  });
});
