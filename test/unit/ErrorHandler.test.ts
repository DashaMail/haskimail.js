import { AxiosError, AxiosHeaders } from "axios";
import { ErrorHandler } from "../../src/errors/ErrorHandler";
import {
  HaskimailError,
  InvalidAPIKeyError,
  ApiInputError,
  InactiveRecipientsError,
  RateLimitExceededError,
  InternalServerError,
  ServiceUnavailableError,
  UnknownError,
} from "../../src/errors/Errors";

function makeAxiosError(
  status: number,
  data?: Record<string, unknown>
): AxiosError {
  const error = new AxiosError("Request failed");
  error.response = {
    status,
    statusText: "Error",
    headers: {},
    config: { headers: new AxiosHeaders() },
    data: data || {},
  };
  return error;
}

describe("ErrorHandler", () => {
  describe("buildError", () => {
    it("должен возвращать InvalidAPIKeyError для статуса 401", () => {
      const error = makeAxiosError(401, {
        ErrorCode: 10,
        Message: "Неверный API ключ",
      });
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(InvalidAPIKeyError);
      expect(result.statusCode).toBe(401);
      expect(result.message).toBe("Неверный API ключ");
    });

    it("должен возвращать HaskimailError для статуса 404", () => {
      const error = makeAxiosError(404, {
        ErrorCode: 0,
        Message: "Не найдено",
      });
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(HaskimailError);
      expect(result.statusCode).toBe(404);
    });

    it("должен возвращать ApiInputError для статуса 422", () => {
      const error = makeAxiosError(422, {
        ErrorCode: 100,
        Message: "Неверные параметры",
      });
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(ApiInputError);
      expect(result.statusCode).toBe(422);
    });

    it("должен возвращать InactiveRecipientsError для кода 406", () => {
      const error = makeAxiosError(422, {
        ErrorCode: 406,
        Message:
          "Found inactive addresses: test@example.com, foo@bar.com. Inactive recipients",
      });
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(InactiveRecipientsError);
      expect((result as InactiveRecipientsError).recipients).toEqual([
        "test@example.com",
        "foo@bar.com",
      ]);
    });

    it("должен возвращать RateLimitExceededError для статуса 429", () => {
      const error = makeAxiosError(429, {
        ErrorCode: 0,
        Message: "Превышен лимит запросов",
      });
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(RateLimitExceededError);
      expect(result.statusCode).toBe(429);
    });

    it("должен возвращать InternalServerError для статуса 500", () => {
      const error = makeAxiosError(500);
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(InternalServerError);
      expect(result.statusCode).toBe(500);
    });

    it("должен возвращать ServiceUnavailableError для статуса 503", () => {
      const error = makeAxiosError(503);
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(ServiceUnavailableError);
      expect(result.statusCode).toBe(503);
    });

    it("должен возвращать UnknownError для неизвестного статуса", () => {
      const error = makeAxiosError(418);
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(UnknownError);
      expect(result.statusCode).toBe(418);
    });

    it("должен обрабатывать ошибку без ответа сервера", () => {
      const error = new AxiosError("Network Error");
      error.request = {};
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(HaskimailError);
      expect(result.message).toContain("No response received");
    });

    it("должен обрабатывать ошибку без запроса", () => {
      const error = new AxiosError("Something went wrong");
      const result = ErrorHandler.buildError(error);

      expect(result).toBeInstanceOf(HaskimailError);
      expect(result.message).toBe("Something went wrong");
    });
  });
});
