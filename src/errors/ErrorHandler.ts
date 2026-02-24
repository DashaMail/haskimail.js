import { AxiosError } from "axios";
import {
  HaskimailError,
  InvalidAPIKeyError,
  ApiInputError,
  RateLimitExceededError,
  InternalServerError,
  ServiceUnavailableError,
  UnknownError,
} from "./Errors";

export class ErrorHandler {
  static buildError(error: AxiosError): HaskimailError {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as Record<string, unknown> | undefined;
      const errorCode = (data?.ErrorCode as number) ?? 0;
      const message = (data?.Message as string) ?? error.message;

      switch (status) {
        case 401:
          return new InvalidAPIKeyError(message, errorCode);
        case 404:
          return new HaskimailError(message, errorCode, 404);
        case 422:
          return ApiInputError.buildSpecificError(message, errorCode, 422);
        case 429:
          return new RateLimitExceededError(message, errorCode);
        case 500:
          return new InternalServerError(message, errorCode);
        case 503:
          return new ServiceUnavailableError(message, errorCode);
        default:
          return new UnknownError(message, errorCode, status);
      }
    }

    if (error.request) {
      return new HaskimailError(
        `No response received: ${error.message}`,
        0,
        0
      );
    }

    return new HaskimailError(error.message, 0, 0);
  }
}
