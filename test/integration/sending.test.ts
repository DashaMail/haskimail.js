/**
 * Интеграционные тесты для проверки работы с реальным API Haskimail.
 *
 * Для запуска необходимо задать переменные окружения:
 *   HASKIMAIL_SERVER_TOKEN - серверный токен API
 *   HASKIMAIL_FROM_EMAIL   - адрес отправителя (подтверждённый в системе)
 *   HASKIMAIL_TO_EMAIL     - адрес получателя для тестов
 *
 * Запуск:
 *   HASKIMAIL_SERVER_TOKEN=xxx HASKIMAIL_FROM_EMAIL=a@b.com HASKIMAIL_TO_EMAIL=c@d.com npm run test:integration
 */

import { ServerClient } from "../../src/client/ServerClient";

const SERVER_TOKEN = process.env.HASKIMAIL_SERVER_TOKEN || "";
const FROM_EMAIL = process.env.HASKIMAIL_FROM_EMAIL || "";
const TO_EMAIL = process.env.HASKIMAIL_TO_EMAIL || "";

const skipIfNoToken = !SERVER_TOKEN ? describe.skip : describe;

skipIfNoToken("Интеграционные тесты Haskimail API", () => {
  let client: ServerClient;

  beforeAll(() => {
    client = new ServerClient(SERVER_TOKEN);
  });

  describe("отправка письма", () => {
    it("должен успешно отправить простое письмо", async () => {
      const result = await client.sendEmail({
        From: FROM_EMAIL,
        To: TO_EMAIL,
        Subject: "Тест библиотеки Haskimail Node.js",
        HtmlBody: "<h1>Привет!</h1><p>Это тестовое письмо из библиотеки <b>haskimail</b> для Node.js.</p>",
        TextBody: "Привет! Это тестовое письмо из библиотеки haskimail для Node.js.",
      });

      expect(result).toBeDefined();
      expect(result.ErrorCode).toBe(0);
      expect(result.MessageID).toBeTruthy();
      expect(result.To).toBe(TO_EMAIL);
      console.log(`Письмо отправлено, MessageID: ${result.MessageID}`);
    }, 30000);
  });

  describe("статистика доставки", () => {
    it("должен получить статистику доставки", async () => {
      const result = await client.getDeliveryStatistics();

      expect(result).toBeDefined();
      expect(result.Bounces).toBeDefined();
      console.log("Статистика доставки:", JSON.stringify(result, null, 2));
    }, 15000);
  });

  describe("каналы сообщений", () => {
    it("должен получить список каналов", async () => {
      const result = await client.getMessageStreams();

      expect(result).toBeDefined();
      expect(result.MessageStreams).toBeDefined();
      console.log(
        `Найдено каналов: ${result.TotalCount || result.MessageStreams.length}`
      );
    }, 15000);
  });

  describe("шаблоны", () => {
    it("должен получить список шаблонов", async () => {
      const result = await client.getTemplates({ count: 10, offset: 0 });

      expect(result).toBeDefined();
      expect(result.Templates).toBeDefined();
      console.log(`Найдено шаблонов: ${result.TotalCount}`);
    }, 15000);
  });

  describe("вебхуки", () => {
    it("должен получить список вебхуков", async () => {
      const result = await client.getWebhooks();

      expect(result).toBeDefined();
      expect(result.Webhooks).toBeDefined();
      console.log(`Найдено вебхуков: ${result.Webhooks.length}`);
    }, 15000);
  });

  describe("отказы (bounces)", () => {
    it("должен получить список отказов", async () => {
      const result = await client.getBounces({ count: 10 });

      expect(result).toBeDefined();
      expect(result.Bounces).toBeDefined();
      console.log(`Найдено отказов: ${result.TotalCount}`);
    }, 15000);
  });
});
