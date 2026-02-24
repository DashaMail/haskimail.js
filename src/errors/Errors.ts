export class HaskimailError extends Error {
  public code: number;
  public statusCode: number;

  constructor(message: string, code: number = 0, statusCode: number = 0) {
    super(message);
    this.name = "HaskimailError";
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class HttpError extends HaskimailError {
  constructor(message: string, code: number = 0, statusCode: number = 0) {
    super(message, code, statusCode);
    this.name = "HttpError";
  }
}

export class InvalidAPIKeyError extends HttpError {
  constructor(message: string = "Invalid API key", code: number = 0) {
    super(message, code, 401);
    this.name = "InvalidAPIKeyError";
  }
}

export class ApiInputError extends HttpError {
  constructor(message: string, code: number = 0, statusCode: number = 422) {
    super(message, code, statusCode);
    this.name = "ApiInputError";
  }

  static buildSpecificError(
    message: string,
    code: number,
    statusCode: number
  ): ApiInputError {
    if (code === 406) {
      return new InactiveRecipientsError(message, code);
    }
    if (code === 300) {
      return new InvalidEmailRequestError(message, code);
    }
    return new ApiInputError(message, code, statusCode);
  }
}

export class InactiveRecipientsError extends ApiInputError {
  public recipients: string[];

  constructor(message: string, code: number = 406) {
    super(message, code, 422);
    this.name = "InactiveRecipientsError";
    this.recipients = InactiveRecipientsError.parseInactiveRecipients(message);
  }

  static parseInactiveRecipients(message: string): string[] {
    const pattern = /Found inactive addresses: (.+?)\.?\s*Inactive/i;
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1].split(",").map((email) => email.trim());
    }
    return [];
  }
}

export class InvalidEmailRequestError extends ApiInputError {
  constructor(message: string, code: number = 300) {
    super(message, code, 422);
    this.name = "InvalidEmailRequestError";
  }
}

export class RateLimitExceededError extends HttpError {
  constructor(message: string = "Rate limit exceeded", code: number = 0) {
    super(message, code, 429);
    this.name = "RateLimitExceededError";
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal server error", code: number = 0) {
    super(message, code, 500);
    this.name = "InternalServerError";
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message: string = "Service unavailable", code: number = 0) {
    super(message, code, 503);
    this.name = "ServiceUnavailableError";
  }
}

export class UnknownError extends HttpError {
  constructor(message: string = "Unknown error", code: number = 0, statusCode: number = 0) {
    super(message, code, statusCode);
    this.name = "UnknownError";
  }
}
